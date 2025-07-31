// Obtener la fecha actual
const today = new Date();
// Formatear la fecha en formato YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

// Calcular la fecha máxima (dos meses después)
const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 2);

// Asignar los valores a los atributos min y max
document.getElementById("fecha").setAttribute("min", formatDate(today));
document.getElementById("fecha").setAttribute("max", formatDate(maxDate));

// Función para manejar la reserva
function manejarReserva(event) {
  event.preventDefault(); // Evitar que el formulario se envíe y recargue la página

  // Obtener los datos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const fecha = document.getElementById("fecha").value;
  const comensales = parseInt(document.getElementById("comensales").value);
  const descripcion = document.getElementById("descripcion").value.trim();

  // Validar que la fecha y la cantidad de comensales sean válidas
  if (!fecha || isNaN(comensales) || comensales < 1 || comensales > 50) {
    alert(
      "Por favor, ingresa una fecha válida y una cantidad de comensales entre 1 y 50."
    );
    return;
  }

  // Obtener reservas existentes del localStorage
  let reservas = JSON.parse(localStorage.getItem("reservas")) || {};

  // Obtener las reservas para la fecha seleccionada
  let reservasPorFecha = reservas[fecha] || [];

  // Calcular la cantidad total de comensales ya reservados en esa fecha
  const totalComensalesReservados = reservasPorFecha.reduce(
    (total, reserva) => total + reserva.cantidad,
    0
  );

  // Verificar si hay capacidad suficiente
  if (totalComensalesReservados + comensales > 50) {
    alert(
      "No es posible realizar la reserva. Se ha alcanzado la capacidad máxima para esa fecha."
    );
    return;
  }

  // Crear la reserva
  const nuevaReserva = {
    nombre: nombre,
    email: email,
    telefono: telefono,
    cantidad: comensales,
    descripcion: descripcion,
  };

  // Agregar la reserva a la lista de reservas para esa fecha
  reservasPorFecha.push(nuevaReserva);
  reservas[fecha] = reservasPorFecha;

  // Guardar en localStorage
  localStorage.setItem("reservas", JSON.stringify(reservas));

  // Mostrar en consola toda la base de datos de reservas
  console.log(
    "Historial completo de reservas:",
    JSON.parse(localStorage.getItem("reservas"))
  );

  // Mostrar en consola la reserva
  console.log(`Reserva para el ${fecha}:`);
  console.log(`Nombre: ${nombre}`);
  console.log(`Email: ${email}`);
  console.log(`Teléfono: ${telefono}`);
  console.log(`Cantidad de comensales: ${comensales}`);
  if (descripcion) {
    console.log(`Descripción adicional: ${descripcion}`);
  }

  // Mostrar alerta de éxito
  alert("La reserva se realizó correctamente.");

  // Limpiar el formulario después de reservar
  document.querySelector("form").reset();
}

// Agregar evento al formulario
document.querySelector("form").addEventListener("submit", manejarReserva);
