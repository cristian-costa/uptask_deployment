/*
    1)  package.json (revisa dependencias, configuracion del proyecto, scripts)
        'ejecuto npm init'

    2)  instalar dependencias:
        existes dos tipos de dependencias, del proyecto (--save) y de desarrollo(--save-dev)
        Instalar express: 'npm install --save express' (crea el servidor)
        Instalar nodemon: 'npm instal --save-dev nodemon' (detecta cambios en archivos y reinicia el servidor)

        Puedo borrar node_modules, para reinstalar esa carpeta con las dependencias instaladas (que figuran en el package) ejecuto 'npm install' npm lee las dependencias y las instala (tanto las de desarrollo como las del proyecto)

    3)  crear servidor de express

    4)  ejecuto con 'nodemon ./index.js' (busca configuracion en ese archivo)
        Conviene crear un script en el package.json
        "start": "nodemon ./index.js" 
        De esta manera solo ejecuto 'npm run start' (funciona tambien con 'npm start')

    5)  Patron MVC
        Patron de diseno de software que permite la separacion de obligaciones de cada pieza de codigo en tu aplicacion.
        Enfatiza la separacion de la logica de separacion y lo que se muestra en una pantalla

        Definiciones:

        Model.
            Encargado de los datos (desde una base de datos) y de la logica para mostrar esos datos.
            Ejemplo: un usuario quiere ver la seccion de productos, el modelo se encargara de realizar la consulta en la base de datos.
        View.
            Se encarga de lo que se ve en pantalla (HTML)
            Ejemplo: el modelo hace la consulta a la BD, la vista muestra los resultados
        Controller.
            Se comunica entre el modelo y la vista. Antes de que el modelo consulte a la base de datos es el encargado de mandarlo a llamar, y tambien una vez que el modelo tiene los resultados de la consulta, es el que se encarga de pasarlos a la vista.
        
        Router.
            Encargado de registrar todas las URLs o endpoints que la aplicacion soporta.
            Si el usuario accede a /productos, el router llama a un controlador, el cual se comunica con el modelo para obtener los datos que son pasados hacia el controlador y luego hacia la vista para ser mostrados.
        
        Accedo a: /PRODUCTOS --- CONTROLLER --- MODEL --- CONTROLLER --- VIEW
        

    6)  Que son los Template Engines?
        Es lo que se conoce como la V (vista)
        Permiten mostrar la parte visual (HTML) en una aplicacion express, debido a que el modelo retorna un objeto (o arreglo) de datos, un template engine permitira acceder a los resultados de una consulta y mostrarlos en pantalla
        Hay una gran variedad y cada uno tiene su propia sintaxis.
        Usualmente puedes escribir codigo JS dentro de HTML

        Lo mas comunes en NODE - EXPRESS
        -   PUG (antes JADE)
        -   EJS EMBEDDED JAVASCRIPT
        -   HBS HANDLEBARS.JS (MUSTACHE.JS)
        -   REACT

        Un Template Engine se instala via NPM
        'npm install pug'
        Y se habilita en el archivo principal
        app.set('view engine', 'pug');

        EJEMPLO PUG (no es necesario crear etiqueta de apertura y cierre)
            if tareas.length
                each tarea in tareas
                    li.tarea(data-tarea=`${tarea.id}`)
                        p=tarea.tarea

        EJEMPLO HANDLEBARS
            <div class="caja">
                <p class="etiqueta">Empresa:</p>
                <p class="nombre">{{vacante.empresa}}</p>
            </div>
            <div class="caja">
                <p class="etiqueta">Ubicacion:</p>
                <p class="nombre">{{vacante.ubicacion}}</p>
            </div>
        
        EJEMPLO EJS
            <div class="informacion-usuario">
                <div class="imagen">
                    <% if(usuario.imagen) { %>
                        <img src="/uploads/perfiles/"<%=usuario.imagen%>">
                    <% } %>
                </div>
                <div class="texto">
                        <%- usuario.descripcion %>
                </div>
            </div>
        
        https://github.com/expressjs/express/wiki#template-engines

    -----------------
    7)  Databases.
        Que es un ORM? Object Relational Mapping
        Un ORM te permite almacenar / ler objetos en tu base de datos
        Los objetos se definen con un lenguaje de programacion
        Relational es la base de datos
        Mapping es la union de ambos.

        Ventajas
            . Evitan repeticion de codigo ya que el modelo solo se define en un lugar y solo con importar el modelo al controlador tendras acceso a todos los metodos del ORM
            . Acelera el proceso de desarrollo ya que hay una gran cantidad de metodos para el CRUD
            . No es necesario escribir codigo SQL

            . Seguridad: los ORM cuentan con sentencias preparadas para evitar la inyeccion de datos no esperados y cuentan con una gran cantidad de medidas de seguridad que hacen que no tengas que preocuparte por esto en tus apps.
            . Escrito en el lenguaje de tu app.
        
        Desventajas
            . Aprender la sintaxis nueva del ORM
            . Instalarlo, en algunos casos es sencillo y en otros no tanto.
            . El performance puede ser un poco mas lento que consultas SQL nativas.
        
        Un ORM no es especifico de NODE
        PHP - Propel y Doctrine
        JAVA - Hibernate
        Python - SQL Alchemy
        C# - Entity Framework

        ORM'S en NODE
        Sequalize soporta MYSQL, POSTGRESQL, SQL SERVER y SQLITE.
        MONGOOSE es otro ORM que te permite conectar MONGODB en apps node.

        Modelo y ORM
        Usualmente los modelos y el ORM estan relacionados y puede ser posible que sea dificil de comprender que es lo que hace cada uno
        El modelo es el lugar unico donde se describe la forma de los objetos y es facil agregar/quitar campos para la BD, mientras que el ORM tiene los metodos para la BD.

        Ejemplo
        MODELO
            const usuarios = db.define(
                'usuarios',
                {
                    id: {
                        type: Sequalize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    password: {
                        type: Sequalize.STRING
                    },
                    nombre: {
                        type: Sequalize.STRING
                    }
                }
            )
        
        ORM
            CREAR USUARIO:

            const usuario = {
                password,
                nombre
            }

            Usuarios.create(usuario);

            OBTENER USUARIO
            Usuarios.findOne({
                where: {
                    email
                }
            });

    
        
*/
