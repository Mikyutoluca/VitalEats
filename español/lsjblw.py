print("Milplacion de numeros")
cantidad = int(input("¿Cuántos números deseas multiplicar? "))

resultado = 1

for i in range(cantidad):
    num = float(input(f"Ingrese el número {i+1}: "))
    resultado *= num  

print("El resultado de la multiplicación es:", resultado)


    