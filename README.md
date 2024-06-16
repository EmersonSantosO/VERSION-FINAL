🛍️ Aplicación Bazar
Aplicación Bazar es una plataforma diseñada para la gestión de productos, clientes, ventas y usuarios. Este proyecto utiliza Django para el backend y React con Vite para el frontend.

🚀 Tecnologías Utilizadas
Backend
🐍 Django
📏 Pylint
🛠️ Pylint-Celery
🛠️ Pylint-Django
🌐 Django-Cors-Headers
📦 DjangoRestFramework
📘 CoreAPI
🖼️ Pillow
🔧 Setuptools
Frontend
⚛️ React
🛠️ Vite
📡 Axios
💄 Bootstrap
💄 React-Bootstrap
🛤️ React-Router-Dom
🔤 FontAwesome
🎉 Canvas-Confetti
🎊 Confetti
🔄 Lodash
🔥 React-Hot-Toast
🔣 React-Icons
🪄 React-Magic-Motion
🍭 SweetAlert2
📋 Requisitos Previos
Node.js y npm instalados para el frontend.
Python y pip instalados para el backend.
⚙️ Instalación
Backend
Clonar el repositorio:

bash:

git clone https://github.com/tu-usuario/aplicacion-bazar.git
Navegar a la rama Version3.0:

bash:

cd aplicacion-bazar
git checkout Version3.0
Navegar al directorio del backend e instalar dependencias:

bash:

cd backend
pip install -r requirements.txt
Aplicar las migraciones de la base de datos:

bash:

python manage.py migrate
Ejecutar el servidor de desarrollo:

bash:

python manage.py runserver
Frontend
Navegar al directorio del frontend e instalar dependencias:

bash:

cd frontend
npm install
Ejecutar el servidor de desarrollo:

bash

npm run dev
📜 Scripts Disponibles
En el directorio del frontend, puedes ejecutar los siguientes scripts:

npm run dev: Inicia el servidor de desarrollo.
npm run build: Construye la aplicación para producción.
npm run lint: Ejecuta ESLint para analizar el código en busca de errores.
npm run preview: Previsualiza la aplicación construida.
📝 Descripción de Funcionalidades
🔐 Autenticación
La aplicación permite a los usuarios iniciar sesión con su nombre de usuario y contraseña. La autenticación es necesaria para acceder a las demás funcionalidades.

🛒 Gestión de Productos
Los usuarios pueden añadir, editar y eliminar productos. Cada producto incluye detalles como nombre, descripción, código, tipo, precio e imagen.

👥 Gestión de Clientes
Permite la gestión de información de los clientes, incluyendo la creación y eliminación de registros de clientes.

💰 Gestión de Ventas
Registro y visualización de ventas realizadas. Cada venta incluye detalles del producto, cantidad y total.

👤 Gestión de Usuarios
Los administradores pueden gestionar la información de otros usuarios, incluyendo la creación y eliminación de usuarios.
