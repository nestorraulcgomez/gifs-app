import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey = 'vFZ1ZHjty7tRl3egjXi6TPAX1KV8Ps6A';
  private serviceUrl = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

  }

  get tagHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
    if( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag: string) :Promise<void>{
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params} )
      .subscribe((resp) => {
        this.gifList = resp.data;
      });

  }
}
