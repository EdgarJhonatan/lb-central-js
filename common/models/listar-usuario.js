"use strict";

module.exports = function (listarUsuario) {
  listarUsuario.listarGet = function (data, cb) {
    const main = async () => {
      try {
        console.log(data);
        var bodyJson;
        console.log(`========== Consultamos a la Base de datos  ==========`);
        const query = `select * from public.tbusuari where co_docide = '${data}';`;
        console.log(query);
        const respQuery = await consultaBD(query);
        console.log(respQuery);
        if (JSON.stringify(respQuery) == "[]") {
          bodyJson = {
            codRes: "02",
            message: "No se encontró ningún registro.",
          };
        } else {
          bodyJson = { codRes: "00", message: "OK", data: respQuery };
        }
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
        const db = listarUsuario.dataSource;
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
