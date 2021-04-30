const { response, request } = require('express');

const adminRole= (req = request, res = response, next) => {
  const { role, name } = req.userVal;
  if (!req.userVal) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero"
    })
  }
  
  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `El usuario ${name} no tiene los permisos necesarios para eliminar.`
    })
  }
  next();
}


const tieneRol = ( ...roles ) => {
  return (req = request, res = response, next) => {
    const { role, name } = req.userVal;
    if (!req.userVal) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero"
      })
    }
  
  if (!roles.includes(role)) {
    return res.status(401).json({
      msg: `El usuario ${name} no tiene los permisos necesarios para eliminar.`
    })
  }
  next();
  }
}


module.exports = {
  adminRole,
  tieneRol
}