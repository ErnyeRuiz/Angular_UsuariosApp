import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  listaUsuarios:any[]=[]; //se almacenan los usuarios

  form: FormGroup;

  respuestaApi="";

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private usuarioService:UsuariosService){
    this.form = this.fb.group({
      nombre:['', Validators.required], //validacion de nombre y correo
      apellidos:[''],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]]
    })
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  //metodo para agregar usuario
  agregarUsuario(){   
    const user: any={
      userName:this.form.get('nombre')?.value,
      lastName:this.form.get('apellidos')?.value,
      email:this.form.get('correo')?.value,
    }   
    //se utiliza el servicio con el metodo post para agregar el usuario
    this.usuarioService.postNuevoUsuario(user).subscribe((data)=>{
      this.respuestaApi=data;
      //notificacion
    this.toastr.success('El usuario se registró correctamente', 'Usuario registrado');
    this.listaUsuarios=[]; //se vacia la lista
    this.obtenerUsuarios(), //se carga la lista nuevamente
    this.form.reset() //se limpia el form
    },error=>{
        // Log del error en la consola
        console.log("Error de la API:", error);

        // Obtener el mensaje de error específico
        const errorMessage = error.error.mensaje;

        // Notificación de error
        this.toastr.error(errorMessage, 'Error');
    });   
  }
  //metodo para listar los usuarios
  obtenerUsuarios(){
    this.usuarioService.getListaUsuarios().subscribe(data=>{
     // console.log(data);
      this.listaUsuarios=data;
    },error=>{this.toastr.error("No se pudo cargar la lista","Respuesta de la transacción")},
    )
  }
}

