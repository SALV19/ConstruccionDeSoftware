-- Materiales(Clave, Descripción, Costo)
-- Proveedores(RFC, RazonSocial)
-- Proyectos(Numero,Denominacion)
-- Entregan(Clave, RFC, Numero, Fecha, Cantidad)


-- Los materiales (clave y descripción) entregados al proyecto "México sin ti no estamos completos".

SELECT m.clave, descripcion 
FROM materiales m, entregan e, proyectos p
WHERE m.clave = e.clave
AND e.numero = p.numero
AND p.denominacion = 'México sin ti no estamos completos'

-- Los materiales (clave y descripción) que han sido proporcionados por el proveedor "Acme tools".

SELECT m.clave, descripcion 
FROM materiales m, entregan e, proveedores p
WHERE m.clave = e.clave
AND e.rfc = p.rfc
AND p.RazonSocial = 'Acme tools';


-- El RFC de los proveedores que durante el 2000 entregaron en promedio cuando menos 300 materiales.

SELECT p.rfc
FROM proveedores p, entregan e
WHERE p.rfc = e.rfc
AND e.fecha BETWEEN 2000-01-01 AND 2000-12-31
GROUP BY p.rfc
HAVING AVG(e.cantidad) > 300



-- El Total entregado por cada material en el año 2000.

SELECT descripcion, SUM(cantidad) as ‘Total’
FROM materiales m, entregan e
WHERE m.clave = e.clave
AND E.fecha BETWEEN '2000-01-01' AND '2000-12-31'
GROUP BY Descripcion
ORDER BY SUM(cantidad) DESC;

-- La Clave del material más vendido durante el 2001. (se recomienda usar una vista intermedia para su solución)

CREATE VIEW materiales_2001 as (SELECT m.clave, COUNT(*) as 'Cantidad entregas'
FROM materiales m, entregan e
WHERE m.clave = e.clave
AND e.fecha BETWEEN 2001-01-01 AND 2001-12-31
GROUP BY clave);

SELECT * FROM materiales_2001;

-- Productos que contienen el patrón 'ub' en su nombre.

SELECT * 
FROM materiales 
WHERE descripcion LIKE '%ub%'

-- Denominación y suma del total a pagar para todos los proyectos.

CREATE VIEW materiales_precio as (SELECT m.clave, descripcion, SUM(m.precio * e.cantidad) as 'Total_a_pagar'
                                  FROM materiales m, entregan e
                                  WHERE m.clave = e.clave
                                  GROUP BY m.clave, descripcion);

SELECT denominacion, m.Total_a_pagar 
FROM materiales_precio m, proyectos p, entregan e
WHERE m.clave = e.clave
AND e.numero = p.numero

-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción
-- que no se encuentran apoyando al proyecto Educando en Coahuila (Solo usando vistas).

DROP VIEW televisa;
DROP VIEW coahuila;

CREATE VIEW televisa as (SELECT pr.denominacion, p.rfc, p.razonsocial, pr.numero
                        FROM entregan e, proveedores p, proyectos pr
                        WHERE e.rfc = p.rfc
                        AND e.numero = pr.numero
                        AND pr.denominacion = 'Televisa en accion');

CREATE VIEW coahuila as (
                        SELECT p.numero
                        FROM entregan e, proyectos p
                        WHERE e.numero = p.numero
                        AND p.denominacion = 'Educando en Coahuila'
                        );

SELECT t.denominacion, t.rfc, t.razonsocial
FROM televisa t, coahuila c
WHERE t.numero = c.numero
AND c.numero = NULL;

-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que 
-- no se encuentran apoyando al proyecto Educando en Coahuila (Sin usar vistas, utiliza not in, in o exists).

SELECT py.denominacion, pr.rfc, pr.razonsocial
FROM Proyectos Py, Entregan E, Materiales M, Proveedores Pr
WHERE E.numero = Py.numero
AND M.clave = E.clave
AND E.rfc = Pr.rfc
AND Py.denominacion = 'Televisa en acción'
AND Py.numero NOT IN (
    SELECT Py2.numero
    FROM Proyectos Py2, Entregan E2
    WHERE E2.Numero = Py2.Numero
    AND Py2.Denominacion = 'Educando en Coahuila'
);

-- Costo de los materiales y los Materiales que son entregados al proyecto Televisa en acción cuyos proveedores también suministran materiales al proyecto Educando en Coahuila.

SELECT M.descripcion, M.precio
FROM Proyectos Py, Entregan E, Materiales M, Proveedores Pr
WHERE E.numero = Py.numero
AND M.clave = E.clave
AND E.rfc = Pr.rfc
AND Py.denominacion = 'Televisa en acción'
AND Py.numero IN (
    SELECT Py2.numero
    FROM Proyectos Py2, Entregan E2
    WHERE E2.Numero = Py2.Numero
    AND Py2.Denominacion = 'Educando en Coahuila'
);



-- Nombre del material, cantidad de veces entregados y total del costo de dichas entregas por 
-- material de todos los proyectos.

SELECT m.descripcion, SUM(e.cantidad), SUM(e.cantidad * m.precio)
FROM materiales m, entregan e
WHERE m.clave = e.clave
GROUP BY m.descripcion