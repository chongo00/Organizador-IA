
import React, { useState, useCallback, useMemo } from 'react';
import { organizeFilesByPrefix } from './services/geminiService';
import type { OrganizationPlan, ScriptType } from './types';
import { FolderIcon, FileIcon, WandIcon, DownloadIcon, ClipboardIcon, LoadingIcon, WindowsIcon, AppleIcon, LinuxIcon } from './components/Icons';

const App: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [organizationPlan, setOrganizationPlan] = useState<OrganizationPlan | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isProcessingFiles, setIsProcessingFiles] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [scriptType, setScriptType] = useState<ScriptType>('bash');
    const [copied, setCopied] = useState<boolean>(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileList = event.target.files;
            setIsProcessingFiles(true);
            setError(null);
            setOrganizationPlan(null);
            
            // Procesar archivos de forma asíncrona en lotes para no bloquear la UI
            // Esto es especialmente importante en Electron con muchas carpetas
            const processFiles = () => {
                try {
                    const filesArray: File[] = [];
                    const batchSize = 100; // Procesar 100 archivos a la vez
                    let index = 0;
                    
                    const processBatch = () => {
                        const end = Math.min(index + batchSize, fileList.length);
                        for (let i = index; i < end; i++) {
                            filesArray.push(fileList[i]);
                        }
                        index = end;
                        
                        if (index < fileList.length) {
                            // Usar requestIdleCallback si está disponible, sino setTimeout
                            if (typeof requestIdleCallback !== 'undefined') {
                                requestIdleCallback(processBatch, { timeout: 100 });
                            } else {
                                setTimeout(processBatch, 0);
                            }
                        } else {
                            setFiles(filesArray);
                            setIsProcessingFiles(false);
                        }
                    };
                    
                    processBatch();
                } catch (e) {
                    console.error('Error procesando archivos:', e);
                    setError('Error al procesar los archivos seleccionados.');
                    setIsProcessingFiles(false);
                }
            };
            
            // Iniciar procesamiento en el siguiente tick del event loop
            if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(processFiles, { timeout: 100 });
            } else {
                setTimeout(processFiles, 0);
            }
        }
    };

    const generateOrganizationPlan = useCallback(async () => {
        if (files.length === 0) {
            setError("Por favor selecciona una carpeta primero.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setOrganizationPlan(null);

        try {
            const fileNames = files.map(f => f.name);
            const plan = await organizeFilesByPrefix(fileNames);
            setOrganizationPlan(plan);
        } catch (e) {
            console.error(e);
            setError("Error al generar el plan de organización. El servicio de IA puede no estar disponible o ha ocurrido un error. Por favor, intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }, [files]);
    
    const unorganizedFiles = useMemo(() => {
        if (!organizationPlan) return files.map(f => f.name);
        const organizedFileSet = new Set(Object.values(organizationPlan).flat());
        return files.map(f => f.name).filter(name => !organizedFileSet.has(name));
    }, [files, organizationPlan]);

    const generatedScript = useMemo(() => {
        if (!organizationPlan) return "";
        
        let script = "";
        if (scriptType === 'bash') {
            script += '#!/bin/bash\n\n# Script generado por Organizador de Archivos IA\n# Ejecuta esto en la carpeta que contiene los archivos.\n\n';
            for (const folderName in organizationPlan) {
                script += `echo "Creando carpeta: ${folderName}"\n`;
                script += `mkdir -p "${folderName}"\n`;
                for (const fileName of organizationPlan[folderName]) {
                    script += `mv "${fileName}" "${folderName}/"\n`;
                }
                script += '\n';
            }
            script += 'echo "¡Organización de archivos completada!"\n';
        } else if (scriptType === 'powershell') {
            script += '# Script PowerShell generado por Organizador de Archivos IA\n# Ejecuta esto en la carpeta que contiene los archivos.\n\n';
            for (const folderName in organizationPlan) {
                script += `Write-Host "Creando carpeta: ${folderName}"\n`;
                script += `if (-not (Test-Path -Path ".\\${folderName}")) { New-Item -ItemType Directory -Path ".\\${folderName}" }\n`;
                for (const fileName of organizationPlan[folderName]) {
                    script += `Move-Item -Path ".\\${fileName}" -Destination ".\\${folderName}\\" -ErrorAction SilentlyContinue\n`;
                }
                script += '\n';
            }
            script += 'Write-Host "¡Organización de archivos completada!"\n';
        }
        return script;
    }, [organizationPlan, scriptType]);
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedScript).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    const downloadScript = () => {
        const fileExtension = scriptType === 'bash' ? 'sh' : 'ps1';
        const blob = new Blob([generatedScript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `organizar_archivos.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
            <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Organizador de Archivos IA</h1>
                    <a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-500 transition-colors">Desarrollado por Chongo</a>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8 flex-grow">
                <div className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 border border-gray-700">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Organiza Tus Archivos en 3 Pasos Sencillos</h2>
                    <p className="text-gray-400 mb-6 max-w-2xl">Esta herramienta analiza los nombres de archivos en una carpeta y genera un script Bash o PowerShell para agrupar archivos relacionados en subdirectorios.</p>
                    
                    {/* Step 1 */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-blue-500 mb-3"><span className="bg-blue-500/20 text-blue-400 rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">1</span> Selecciona Tu Carpeta</h3>
                        <label htmlFor="file-upload" className={`w-full md:w-auto cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-105 ${isProcessingFiles ? 'opacity-50 cursor-wait' : ''}`}>
                            {isProcessingFiles ? <LoadingIcon className="w-5 h-5 mr-2 animate-spin" /> : <FolderIcon className="w-5 h-5 mr-2" />}
                            <span>
                                {isProcessingFiles 
                                    ? 'Procesando archivos...' 
                                    : files.length > 0 
                                        ? `${files.length} archivos seleccionados` 
                                        : 'Elige una carpeta para escanear'}
                            </span>
                        </label>
                        <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            multiple={true} 
                            {...({ webkitdirectory: "", directory: "" } as any)} 
                            onChange={handleFileSelect}
                            disabled={isProcessingFiles}
                        />
                        <p className="text-xs text-gray-500 mt-2">Tus archivos se procesan localmente en tu navegador y nunca se suben.</p>
                    </div>

                    {/* Step 2 */}
                    {files.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-blue-500 mb-3"><span className="bg-blue-500/20 text-blue-400 rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">2</span> Generar Plan de Organización</h3>
                             <button
                                onClick={generateOrganizationPlan}
                                disabled={isLoading}
                                className="w-full md:w-auto disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-105"
                            >
                                {isLoading ? <LoadingIcon className="w-5 h-5 mr-2 animate-spin" /> : <WandIcon className="w-5 h-5 mr-2" />}
                                <span>{isLoading ? 'Analizando...' : 'Analizar con IA'}</span>
                            </button>
                        </div>
                    )}

                    {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}

                    {/* Preview Section */}
                    {(isLoading || organizationPlan || (files.length > 0 && !organizationPlan && !isLoading)) && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                             <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                 <h4 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Archivos Actuales ({files.length})</h4>
                                 <div className="max-h-80 overflow-y-auto pr-2">
                                     {unorganizedFiles.map((name, index) => (
                                         <div key={index} className="flex items-center text-sm py-1.5 text-gray-400">
                                             <FileIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                             <span className="truncate">{name}</span>
                                         </div>
                                     ))}
                                     {Object.keys(organizationPlan || {}).length > 0 && unorganizedFiles.length === 0 && (
                                         <p className="text-sm text-gray-500">Todos los archivos serán organizados.</p>
                                     )}
                                 </div>
                             </div>
                             <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                 <h4 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Plan Generado por IA</h4>
                                 <div className="max-h-80 overflow-y-auto pr-2">
                                     {isLoading && <div className="flex items-center justify-center h-full text-gray-400"><LoadingIcon className="w-6 h-6 animate-spin mr-3"/> Pensando...</div>}
                                     {organizationPlan && Object.keys(organizationPlan).map(folder => (
                                         <div key={folder} className="mb-3">
                                             <div className="flex items-center text-sm font-medium text-blue-400 py-1">
                                                 <FolderIcon className="w-5 h-5 mr-2 text-blue-500"/>
                                                 <span className="truncate">{folder}</span>
                                             </div>
                                             <div className="pl-5 border-l-2 border-gray-700 ml-2.5">
                                                 {organizationPlan[folder].map((file, i) => (
                                                      <div key={i} className="flex items-center text-xs py-1 text-gray-400">
                                                          <FileIcon className="w-3 h-3 mr-2 flex-shrink-0" />
                                                          <span className="truncate">{file}</span>
                                                      </div>
                                                 ))}
                                             </div>
                                         </div>
                                     ))}
                                     {!isLoading && !organizationPlan && <p className="text-sm text-center text-gray-500 pt-10">Haz clic en "Analizar con IA" para ver el plan de organización aquí.</p>}
                                 </div>
                             </div>
                         </div>
                    )}
                    
                    {/* Step 3 */}
                    {organizationPlan && (
                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-blue-500 mb-3"><span className="bg-blue-500/20 text-blue-400 rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">3</span> Obtén Tu Script</h3>
                            <p className="text-gray-400 mb-4">Elige tu sistema operativo, luego copia o descarga el script. Ejecútalo dentro de la carpeta que quieres organizar.</p>
                            
                            <div className="flex space-x-2 mb-4 bg-gray-700 p-1 rounded-lg max-w-min">
                                <button onClick={() => setScriptType('bash')} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center transition-colors ${scriptType === 'bash' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                                    <AppleIcon className="w-4 h-4 mr-2" /><LinuxIcon className="w-4 h-4 mr-2" /> macOS / Linux
                                </button>
                                <button onClick={() => setScriptType('powershell')} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center transition-colors ${scriptType === 'powershell' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                                    <WindowsIcon className="w-4 h-4 mr-2" /> Windows
                                </button>
                            </div>

                            <div className="bg-gray-900 rounded-lg relative border border-gray-700">
                               <div className="absolute top-2 right-2 flex space-x-2">
                                    <button onClick={copyToClipboard} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors" title="Copiar al Portapapeles">
                                        {copied ? <span className="text-xs text-green-400">¡Copiado!</span> : <ClipboardIcon className="w-5 h-5 text-gray-300"/>}
                                    </button>
                                    <button onClick={downloadScript} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors" title="Descargar Script">
                                        <DownloadIcon className="w-5 h-5 text-gray-300"/>
                                    </button>
                               </div>
                               <pre className="p-4 text-sm overflow-x-auto text-gray-300 max-h-96">
                                   <code>
                                     {generatedScript}
                                   </code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            
            <footer className="text-center p-4 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Organizador de Archivos IA.</p>
            </footer>
        </div>
    );
};

export default App;
   