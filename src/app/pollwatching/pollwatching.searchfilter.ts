///
/// https://stackoverflow.com/questions/42715267/how-to-apply-search-filter-on-list-in-angular2
/// 
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], field1: string, field2: string, value: string): any[] {
    if (!items) return [];

   if (value === undefined)
    return items;
   return items.filter(it => it[field1].toLowerCase().indexOf(value.toLowerCase()) >= 0 || it[field2].toLowerCase().indexOf(value.toLowerCase()) >= 0 );
 }
}