import java.util.Scanner;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        String apellidop = "", apellidom = "", nombre = "";
        int dia = 0, mes = 0, año = 0;
        boolean continuar = true;

        while (continuar) {
            System.out.println("\nMENÚ:");
            System.out.println("1. Salir");
            System.out.println("2. Proporcionar Datos personales");
            System.out.println("3. Visualizar Datos personales");
            System.out.println("4. Calcular volumen");
            System.out.print("Seleccione una opción: ");

            int opcion = sc.nextInt();
            sc.nextLine(); 

            switch (opcion) {
                case 1:
                    System.out.println("Saliendo del sistema...");
                    continuar = false;
                    break;

                case 2: 
                    System.out.println("Ingresa tu apellido paterno:");
                    apellidop = sc.nextLine();
                    System.out.println("Ingresa tu apellido materno:");
                    apellidom = sc.nextLine();
                    System.out.println("Ingresa tu(s) nombre(s):");
                    nombre = sc.nextLine();
                    
                    System.out.println("Ingresa el día de tu cumpleaños:");
                    dia = sc.nextInt();
                    System.out.println("Ingresa el mes:");
                    mes = sc.nextInt();
                    System.out.println("Ingresa el año:");
                    año = sc.nextInt();

                    System.out.println("¿Desea ver sus datos? 1. Sí / 2. No");
                    int s = sc.nextInt();
                    if (s == 1) {
                        System.out.println("Hola " + nombre + " " + apellidop + " " + apellidom);
                        System.out.println("Fecha: " + dia + "/" + mes + "/" + año);
                    } 
                    break;

                case 3: 
                    if (nombre.isEmpty()) {
                        System.out.println("No hay datos registrados aún.");
                    } else {
                        System.out.println("Datos: " + nombre + " " + apellidop + " " + apellidom);
                        System.out.println("Cumpleaños: " + dia + "/" + mes + "/" + año);
                    }
                    break;

                case 4: 
                    System.out.print("Largo del prisma: ");
                    double l = sc.nextDouble();
                    System.out.print("Ancho: ");
                    double a = sc.nextDouble();
                    System.out.print("Altura: ");
                    double h = sc.nextDouble();

                    double volumenPrisma = l * a * h;
                    System.out.println("El volumen del prisma es: " + volumenPrisma);
                    break;

                default:
                    System.out.println("Opción no válida.");
                    break;
        }
    }
    sc.close();
}
