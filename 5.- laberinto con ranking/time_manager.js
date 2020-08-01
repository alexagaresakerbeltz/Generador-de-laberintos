
var Total_secs;
var Total_mins;
var tiempo  ;

(function()

{
    var d = document
        qs = 'querySelector',
        ael = "addEventListener",
        frm = d[qs]("form"), 
        canvas = d[qs]("#canvas"),
        ctx = canvas.getContext("2d"),
        canvas_div = d[qs](".canvas_div"),
        textarea = d[qs]("textarea"),
        back_button = d[qs](".back"),
        brick = d.createElement("img"),
        character = d.createElement("img")
        lineas = [],
        character_loc = {
            "x" : 0,
            "y" : 0
        },
        brick_width = 15,
        brick_height = 15,
        canvas_width = 0,
        canvas_height = 0;

    brick.src = "brick.png";
    character.src = "guy.png";

    function limpiarCanvas(){
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function generarLaberinto(laberinto){
        

        lineas = laberinto.split("\n");
        character_loc.x = 0;
        character_loc.y = 0;

    
        for (var i=0; i<lineas.length; i++) {
            var linea = lineas[i];
            if (canvas_width<linea.length) {
                canvas_width = linea.length;
            }

            if (i==0) {
                character_loc.x = linea.indexOf(" ");
            }
        }
        canvas_height = lineas.length;
        canvas.setAttribute("width", (canvas_width * brick_width) + 20);
        canvas.setAttribute("height", (canvas_height * brick_height) + 20);
        
        dibujarLaberinto();
        StartTime();

    }

    function dibujarLaberinto(){
        limpiarCanvas();

        for(var i=0; i<lineas.length; i++){
            var linea = lineas[i];
            for(var j=0; j<linea.length; j++){
                var c = linea[j];
                if (c!="#") continue;
                ctx.drawImage(brick, 
                    j*brick_height + 10,
                    i*brick_width + 10, 
                    brick_width, 
                    brick_height
                );
            }
        }

    
        ctx.drawImage(character, 
            (character_loc.x * brick_width) + 10,
            (character_loc.y * brick_height) + 10,
            brick_width, 
            brick_height
        );                
    }

    function mover(desplazamiento){


        if (desplazamiento.x!=0) {
            
            var nuevo_x = character_loc.x + desplazamiento.x,
                linea = lineas[character_loc.y];
            
            if (linea[nuevo_x]!="#" && nuevo_x>=0) {
                character_loc.x += desplazamiento.x;
            }
        }

        if (desplazamiento.y!=0) {
            var nuevo_y = character_loc.y + desplazamiento.y;

            if (nuevo_y>=0 && nuevo_y<lineas.length) {
                var linea = lineas[nuevo_y];

                if (linea[character_loc.x]!="#") {
                    character_loc.y += desplazamiento.y;
                }
            }
        }



        if(nuevo_y==lineas.length){

        	document.getElementById("posi");

        	 posi.style.display = "block";


        		parar();
        		

        		

        }

        dibujarLaberinto();
    }

    frm[ael]("submit", function(evt){
        evt.preventDefault();
        
        generarLaberinto(textarea.value);
        frm.style.display = "none";
        canvas_div.style.display = "block";
    });

    back_button[ael]("click", function(){
       frm.style.display = "block";
        canvas_div.style.display = "none";
        posi.style.display = "none";

    });


    document[ael]("keydown", function(evt){
        var desplazamiento = {
            x : 0,
            y : 0
        };
        switch(evt.key) {
            case "ArrowDown":
                desplazamiento.y = 1;
                break;
            case "ArrowUp":
                desplazamiento.y = -1;
                break;
            case "ArrowLeft":
                desplazamiento.x = -1;
                break;
            case "ArrowRight":
                desplazamiento.x = 1;
        }

        mover(desplazamiento);
    });





function StartTime(){

seconds = 0;

	s= document.getElementById("seconds");
	m= document.getElementById("minutes");

	cronometer = setInterval(function(){
		seconds++;

		secs= seconds;
		mins= 0;

while(secs>=60){

	mins++;
	secs-=60;
}
 
 if(mins<10) m.innerHTML= "0" + mins;
 else m.innerHTML = mins;
 if(secs<10) s.innerHTML= "0" + secs;
 else s.innerHTML = secs;


Total_secs = secs;
Total_mins = "0" + mins;



	},1000);


	
}


 function parar()
             {
             	tiempo = Total_mins + ':' +Total_secs;
             	clearInterval(cronometer);

             }



guardar_localstorage();

function guardar_localstorage(){

const form = document.querySelector('#ale');
const ul = document.querySelector('#alo');

const input = document.getElementById('item');
let itemsArray = localStorage.getItem('nombre') ? JSON.parse(localStorage.getItem('nombre')) : [];

localStorage.setItem('nombre', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('nombre'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text 
  ul.appendChild(li)
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

   form.style.display = "none";

  itemsArray.push(input.value +' '+tiempo);
  localStorage.setItem('nombre', JSON.stringify(itemsArray));
  liMaker(input.value +' '+tiempo);
  input.value = "";
});

data.forEach(item => {
  liMaker(item);
});

 back_button[ael]("click", function(){
    
               form.style.display = "block";
            });

			}

      } )();





