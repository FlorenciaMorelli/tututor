import { Component } from '@angular/core';

@Component({
  selector: 'how-to',
  standalone: true,
  imports: [],
  templateUrl: './how-to.component.html',
  styleUrl: './how-to.component.css'
})
export class HowToComponent {
  display: boolean = true;

  alumnosInfo: any[] = [
    {nro: 1, titulo: "Busca por materia o nombre", descripcion: "Filtra por zona o modalidad para encontrar el profesor que más se ajuste a tus necesidades.", imagen: ""},
    {nro: 2, titulo: "Obtén la información fácilmente", descripcion: "De un solo vistazo puedes saber si el profesor quiere enseñarte en tu casa, en su casa o en un punto medio. Además, puedes ver en qué zona(s) trabaja el profesor.", imagen: ""},
    {nro: 3, titulo: "Contáctate con tu profesor", descripcion: "Cuando ya tengas elegido a tu profesor, podrás desplegar sus datos y contactarte por tu medio favorito para coordinar una clase, ¡o incluso varias!", imagen: ""},
    {nro: 4, titulo: "Puntúa tu experiencia", descripcion: "No olvides dejar el puntaje para tu profesor, una vez terminada la clase.", imagen: ""},
  ]
  
  profesoresInfo: any[] = [
    {nro: 1, titulo: "Ofrece tus servicios", descripcion: "Hazle saber a tus futuros alumnos qué materias puedes dictar, cuáles son tus modalidades y en qué zonas trabajas.", imagen: ""},
    {nro: 2, titulo: "Tienes la decisión", descripcion: "Tú podrás elegir cuál es la forma en la que darás tus clases: en casa del alumno, en tu hogar o en un punto medio.", imagen: ""},
    {nro: 3, titulo: "Coordina tus clases", descripcion: "Los alumnos podrán contactarte para coordinar sus clases. Por esto, es importante que mantengas tu perfil al día.", imagen: ""},
    {nro: 4, titulo: "Tu opinión importa", descripcion: "No olvides dejar un comentario para tu alumno, una vez terminada la clase.", imagen: ""},
  ]

  changeDisplay(){
    if(this.display){
      this.display = false;
    } else {
      this.display = true;
    }
  }
}
