export class FileConfig{
    tableName: string;
    parent_id: number;
    type: number ;
    acceptedFiles: string = '.jpg,.jpeg,.png';
    canUploadFiles: boolean = true;
    validatorPaterns: string = '/image-jpg|jpeg|png/';
    canShowDiapo: boolean = true;
    canGetFiles: boolean = true;
    mediaTypeToGet: number;
    canShowFiles: boolean = true;
    canDelete: boolean = true;
    maxFileToUpload: number = 1;
    maxFileSize: number = 2000000;
    editFileName?: boolean = false;
}

// ,.pdf,.doc,.pptx,.txt