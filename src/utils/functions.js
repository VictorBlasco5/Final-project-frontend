export const validation = (type, value) => {


    switch (type) {
        case "first_name":
        case "firstName":
        case "lastName":
        case "last_name":
        case "name":
        case "nombre":
        case "surname":
        case "nickname":

            if (value.length < 3) {
                return "Debe contener al menos 3 caracteres"
            }

            return ""

        case "email":

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "El email no es correcto";
            }

            return "";

        case "password_hash":
        case "passwordHash":
        case "password":

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,12}$/;
            if (!passwordRegex.test(value)) {
                return "La contraseña no es correcta";
            }

            return "";

        default:
            console.log("error");
    }

}