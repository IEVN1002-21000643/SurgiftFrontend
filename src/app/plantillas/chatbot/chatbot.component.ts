import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit{
  esperando:boolean=false
  imageCircle:string='/assets/img/logo.png'
  openChat:boolean=false
  stylebot='height: 0vh; width: 0px'
  mensajes=[
    {
      "mensaje": "Hola soy Wowgift, estoy aqui para ayudarte a seleccionar el mejor regalo posible",
      "tipo": "bot"
    }
  ]
  conversacion:any=[]
  formChat!:FormGroup

  constructor(private fb:FormBuilder, private chatbot:ChatbotService){}

  ngOnInit(): void {
    this.formChat=this.initForm()
    this.mostrarMensajes()
  }

  initForm(){
    return this.fb.group({
      mensaje: ['', Validators.required]
    })
  }

  mostrarMensajes(){
    const mensajesLS=JSON.parse(localStorage.getItem('chat')!)
    if(mensajesLS){
      for(let mensaje of mensajesLS)
        this.conversacion.push(mensaje)
    }else{
      this.conversacion=this.mensajes
    }
  }

  mandarMensaje(){
    if(this.formChat.valid){
      const {mensaje}=this.formChat.value
      this.conversacion.push({
        'mensaje':mensaje,
        'tipo': 'user'
      })
      console.log(this.conversacion)
      this.chatbot.enviarMensaje({'mensaje':mensaje, 'tipo':'user'}).subscribe({
        next: response=>{
          this.esperando=true
          setTimeout(() => {
            this.esperando=false
            this.conversacion.push(response)
            localStorage.setItem('chat', JSON.stringify(this.conversacion))
          this.formChat.get('mensaje')?.setValue('')
          }, 6000);
        },
      })
    }
  }

  abrirBot(){
    this.openChat=!this.openChat
    if(this.openChat){
      this.imageCircle='/assets/img/x.png'
      this.stylebot='height: 90vh; width: 550px'
    }else{
      this.imageCircle='/assets/img/logo.png'
      this.stylebot='height: 0vh; width: 0px'
    }
  }
}
