import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  miPorfolio:ImiPorfolio = new MiPorfolio();
  
  estadoApp!:IappEstado;
  suscription!:Subscription

  
  
  constructor(private datosPorfolio: PorfolioService, 
              private rutas: Router,
              private estadoObs:EstadoService
              ) { 
                
                  this.datosPorfolio.obtenerDatos().subscribe(data=>{
                  this.miPorfolio = data;
                  console.log(data);
                  
                  });
              }
  
  ngOnInit(): void {
    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        
        console.log('navbar suscription',this.estadoApp);
        
        }
      )
    
    
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  editEvent(){
    console.log('edit evento link red');
    
  }

  deleteEvent(){
    console.log('evento eliminar link red');
    
  }
}
