function getFolderAndFileName(path: string) {
    if (!path) return { folderName: '', fileName: '' };
    const parts = path.split('/');
    const fileName = parts.pop() ?? ''; // Récupère le dernier élément (nom du fichier)
    const folderName = parts.pop() ?? ''; // Récupère l'avant-dernier élément (nom du dossier)
    return { folderName, fileName };
}

export default getFolderAndFileName;
