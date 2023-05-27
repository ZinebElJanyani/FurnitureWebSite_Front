import {Pipe , PipeTransform } from '@angular/core';


@Pipe({
    name : 'Summary'
})
export class SummaryPipe implements PipeTransform{
    transform(value: string , nombreC?: number) {
        if (!value)
            return null ;
        let variable = (nombreC) ? nombreC : 50;
        return value.substring(0,variable)+" ....";
            
        

    }
}