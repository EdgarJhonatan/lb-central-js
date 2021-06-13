"use strict";

module.exports = function (listarCuentaFinanciera) {
  listarCuentaFinanciera.listarGet = function (cuenta, tipoAccion, cb) {
    const main = async () => {
      try {
        console.log(cuenta, tipoAccion);
        var bodyJson;
        console.log(`========== Consultamos a la Base de datos  ==========`);
        const query = `select * from public.ws_listar_cuentaFinanciera ('${cuenta}', '${tipoAccion}');`;
        console.log(query);
        const SC = await consultaBD(query);
        console.log(SC);
        if (SC == null) {
          bodyJson = { codRes: "99", message: "Error interno" };
        } else {
          if (SC[0].co_estado == "99") {
            bodyJson = { codRes: "99", message: SC[0].no_estado, data: null };
          } else if (SC[0].co_estado == "01") {
            bodyJson = { codRes: "01", message: SC[0].no_estado, data: null };
          } else {
            bodyJson = {
              codRes: "00",
              message: SC[0].no_estado,
              data: SC[0].js_resdat,
            };
          }
        }

        console.log(bodyJson);
        cb(null, bodyJson);
      } catch (error) {
        console.log(error.message);
        bodyJson = {
          codRes: "99",
          data: error.message,
        };
        cb(null, bodyJson);
      }
    };

    main();

    function consultaBD(query) {
      return new Promise(function (resolve, reject) {
        if (reject) {
          console.log(reject);
        }
        const db = listarCuentaFinanciera.dataSource;
        db.connector.query(query, function (err, result) {
          if (err) {
            console.log(err);
          }
          return resolve(result);
        });
      });
    }
  };
};
