import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {

    checkEquality(blockItem1: string, blockItem2: string, blockItem3: string) {
        return (blockItem1!='' && blockItem1 == blockItem2 && blockItem2 == blockItem3);
    }
}