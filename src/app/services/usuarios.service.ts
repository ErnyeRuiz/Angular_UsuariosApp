import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //url de la api //se debe de cambiar dependiendo el puerto en el que se este ejecutando la api
  private urlAPI="http://localhost:5207/";
  //url del servicio
  private endpointAPI="users";

  constructor(private http: HttpClient) {}

  //metodo get para listar los usuarios
  getListaUsuarios():Observable<any> {
    return this.http.get(this.urlAPI+this.endpointAPI);
  }
  //metodo post para insertar usuarios
  postNuevoUsuario(usuario:any):Observable <any>{  
    return this.http.post(this.urlAPI+this.endpointAPI,usuario)
  }
}
