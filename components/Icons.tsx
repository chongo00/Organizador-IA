
import React from 'react';

type IconProps = {
  className?: string;
};

export const FolderIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
);

export const FileIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

export const WandIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118 2.25 2.25 0 0 1-2.47-2.118c0-.62.27-1.22.7-1.644a3 3 0 0 0-5.78-1.128 2.25 2.25 0 0 1-2.118-2.47 2.25 2.25 0 0 1 2.118-2.47c.62 0 1.22.27 1.644.7a3 3 0 0 0 1.128-5.78 2.25 2.25 0 0 1 2.47-2.118 2.25 2.25 0 0 1 2.47 2.118c0 .62-.27 1.22-.7 1.644a3 3 0 0 0 5.78 1.128 2.25 2.25 0 0 1 2.118 2.47 2.25 2.25 0 0 1-2.118 2.47Zm1.04-4.881a2.25 2.25 0 0 0-3.182-3.182L10.5 9.75l-1.06 1.06-3.182-3.182a2.25 2.25 0 0 0-3.182 3.182l3.182 3.182-1.06 1.06-3.182-3.182a2.25 2.25 0 0 0-3.182 3.182l3.182 3.182 1.06-1.06 3.182 3.182a2.25 2.25 0 0 0 3.182-3.182l-3.182-3.182 1.06-1.06 3.182 3.182Z" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9A2.25 2.25 0 0 1 6.75 5.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

export const LoadingIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.696v4.992h-4.992v-4.992z" />
    </svg>
);

export const WindowsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM13 13H21V21H13V13Z" />
  </svg>
);

export const AppleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.42 14.85C17.42 14.85 18.5 13.6 18.5 11.79C18.5 9.5 16.94 8.25 16.94 8.25C15.82 7.41 14.54 7.6 13.88 7.6C12.92 7.6 11.68 7.23 11.68 7.23C10.15 6.64 8.65 7.42 7.97 8.64C6.61 11.05 7.55 14.85 9.25 17.06C10.05 18.08 11.02 19.25 12.25 19.24C13.43 19.23 13.84 18.54 15.34 18.54C16.92 18.54 17.29 19.25 18.5 19.25C19.75 19.25 20.62 18.12 21.29 17.08C19.49 16.2 19.16 15.54 17.42 14.85ZM13.06 5.25C13.62 4.54 14.38 3.75 15.42 3.75C16.5 3.75 17.43 4.69 17.84 5.75C16.89 6.13 16.03 6.78 15.44 7.54C14.85 8.35 14.07 9.25 13 9.25C11.95 9.25 11 8.32 10.63 7.25C11.59 6.84 12.44 6.07 13.06 5.25Z" />
  </svg>
);

export const LinuxIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.53 13.2L5 12.28L2.4 11.16L2.5 10.5L6.68 11.45V11.23L4.93 7.84L5.53 7.68L6.89 10.19L11.5 8.16L11.39 7.47L10.3 7.8L9.63 6.35L10.22 6.09L11.75 6.86V6.65L11.41 4.54L12 4.41L12.59 6.5L14.05 6.04L13.5 3.53L14.09 3.38L15.15 6.16L16.25 5.8L15.93 4.11L16.5 3.93L17.43 6.11L18.47 5.74L18.25 4.5L18.81 4.3L19.5 6.09L20.4 5.76L20.2 4.62H20.78L21.5 6.35L22.09 6.16L21.35 4H21.94L22.4 5.75L23.12 5.46L22.22 2H23.12L24 5.16L18.5 7.5L14.7 9.06L10.22 11.03L12.71 14.84L12.08 15.15L10.74 12.78L5.78 15.06L5.8 15.71L8.28 14.65L7.73 15.68L5.2 16.73L5.09 16.1L8.72 14.41L11.69 18.06C11.69 18.06 12.42 22 10 22C7.58 22 8.06 18.06 8.06 18.06L6.5 15.71L2.83 17.5L2.17 17.2L4.53 13.2M10.5 10.04L14.33 8.35L17.75 7.03L18.25 9.25C17.05 9.72 15.82 10.13 14.62 10.5C13.43 10.87 12.23 11.21 11.07 11.5L9.61 10.81L10.5 10.04M.5 11.54L1.75 11.04L1.25 9.8L0 10.3L.5 11.54M8.28 2.76L9.68 4.23L8.85 4.9L7.45 3.43L8.28 2.76Z" />
  </svg>
);
   