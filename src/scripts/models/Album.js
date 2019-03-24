export class Album {
    constructor(id) {
        this.albumID = id;
        this.title = 'AlbumTitle';
        this.albumType = 'Album';
    };
    getAlbumType() {
        return this.albumType;
    };
};

export class Compilation extends Album {
    constructor(id) {
        super(id);
        this.albumType = 'Compilation';
    };
    getAlbumType() {
        return 'Compilation';    
    };
};