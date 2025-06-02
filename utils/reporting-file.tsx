import fileSaver from 'file-saver';


export function saveAsPDFFile(buffer: BlobPart, fileName: string): void {
    const PDF_TYPE = 'application/pdf';
    const PDF_EXTENSION = '.pdf';
    const data: Blob = new Blob([buffer], {
        type: PDF_TYPE
    });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + PDF_EXTENSION);
}

export function saveAsExcelFile(buffer: BlobPart, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}