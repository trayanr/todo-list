import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'customDatePipe'})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | null): string {
    if (value == null) {
        return "--";
    }
    return `${
        value.getUTCDate().toString().padStart(2, '0')
    }/${
        (value.getUTCMonth()+1).toString().padStart(2, '0')
    }/${
        value.getUTCFullYear().toString().padStart(2, '0')
    } ${value.getUTCHours().toString().padStart(2, '0')
    }:${
    value.getUTCMinutes().toString().padStart(2, '0')}`;
  }
}