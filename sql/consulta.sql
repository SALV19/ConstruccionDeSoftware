SELECT M.descripcion, E.fecha, P.denominacion, Pr.razonsocial FROM 
materiales M, entregan E, proyectos P, proveedores Pr
WHERE E.clave = M.clave
AND E.numero = P.numero
AND E.rfc = Pr.rfc;