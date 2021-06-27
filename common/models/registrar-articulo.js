"use strict";

module.exports = function (registrarArticulo) {
  registrarArticulo.registrarArticuloPost = function (data, cb) {
    let bodyJson;
    const main = async () => {
      try {
        console.log(data);
        console.log(`========== Registramos en la Base de datos ==========`);
        const query = `select * from public.ws_crud_articulo (
                            '${data.codigo}',
                            '${data.articulo}',
                            '${data.usuario}',
                            '${data.tipoAccion}'
                        );`;
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
        cb(null, bodyJson);
      } catch (error) {
        console.log(error);
      }
    };

    main();

    function consultaBD(query) {
      return new Promise(function (resolve, reject) {
        if (reject) {
          console.log(reject);
        }
        const db = registrarArticulo.dataSource;
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
