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

            if (value.length > 50) {
                return "El nombre es demasiado largo"
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

        case "URL_maps":

            const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

            if (!urlRegex.test(value)) {
                return "La URL no es correcta";
            }


            return "";

        case "direction":

        if (value.length < 3) {
            return "Debe contener al menos 3 caracteres"
        }

        if (value.length > 255) {
            return "La dirección es demasiado larga"
        }
        
        return "";
      
        case "information":

            if (value.length < 1) {
                return "La información es necesaria"
            }

            if (value.length > 255) {
                return "La información es demasiado larga"
            }

            return "";

        case "number_players":
                
                if (value === "") {
                    return "El número de jugadores es necesario"
                }
    
                return "";

        case "match_date":

        const match_date = new Date(value);
        if (match_date < new Date()) {
            return "La fecha no puede ser anterior a la actual"
        }

        return "";

        default:
            console.log("error");
    }
}