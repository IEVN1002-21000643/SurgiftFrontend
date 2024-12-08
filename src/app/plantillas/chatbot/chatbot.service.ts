import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http:HttpClient) { }

  public enviarMensaje(data:any){
    return this.http.post('http://127.0.0.1:5000/chatbot', data)
  }
}
