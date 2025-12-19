export namespace main {
	
	export class BebopResponse {
	    ok: boolean;
	    status: number;
	    statusText: string;
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new BebopResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ok = source["ok"];
	        this.status = source["status"];
	        this.statusText = source["statusText"];
	        this.body = source["body"];
	    }
	}

}

