# Instalación
Primero instalas las dependencias para esto vas a necesitar NodeJS yo estoy usando la versión 14.17.0 en este momento
Podes elegir cualquier version estable de node que las encontras en la pagina.
El comando para instalar una vez que tengas node en tu maquina Windows/linux es "npm install"
una vez instalado node y las dependencias con npm install
# Ejecución
Simplemente en tu consola de windows te situas en la carpeta donde clonaste el repo y ejecutas
node index.js esto va a ejecutar la herramienta cypress de testing y va a simular a un usuario entrando a los distintos swaps y cargando los datos
devolviendote un JSON con esta información
{
  "data": [
    {
      "name": "Krill", // EL NOMBRE DEL TOKEN
      "value": "37.1012", // LA CANTIDAD QUE TENES DEL TOKEN EN USD
      "status": 14.841199999999997 // SACA EL CALCULO DE LA BASE MENOS EL VALOR ACTUAL EN USD RESULTANDO CUANTOS USD TENES ARRIBA O ABAJO de lo que compraste expresado en valores negativos o positivos.
    }
  ]
}