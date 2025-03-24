-- Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
-- Proveedores(RFC, RazonSocial)
-- Proyectos(Numero, Denominacion)
-- Entregan(Clave, RFC, Numero, Fecha, Cantidad)



  -- La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.
SELECT SUM(cantidad + (precio*impuesto)) 
FROM Entregan e, Materiales m 
WHERE e.clave = m.clave 
AND e.fecha = '1997';
  -- Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe 
  -- total de las entregas realizadas.
SELECT Pr.RazonSocial, COUNT(*) as 'Numero de Entregas', 
SUM(precio + (precio * impuesto)) as 'Importe Total' 
FROM Entregan as E, Proveedores as Pr, Materiales as M
WHERE E.clave = M.clave
AND E.RFC = Pr.RFC
GROUP BY RazonSocial;
  -- Por cada material obtener la clave y descripción del material, la cantidad total entregada, 
  -- la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas
  -- de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.
SELECT 
  m.clave, 
  m.descripcion, 
  SUM(e.cantidad) AS cantidad_total, 
  MIN(e.cantidad) AS cantidad_minima,
  MAX(e.cantidad) AS cantidad_maxima,
  SUM(e.cantidad * m.precio) AS importe_total
FROM materiales m, entregan e
WHERE m.clave = e.clave
GROUP BY m.clave, m.descripcion
HAVING AVG(e.cantidad) > 400;

-- Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de 
-- cada material entregado, detallando la clave y descripción del material, excluyendo 
-- aquellos proveedores para los que la cantidad promedio sea menor a 500.

SELECT P.RazonSocial, AVG(E.Cantidad) as ‘Cantidades’, M.clave, M.descripcion
FROM Proveedores as P, Entregan as E, Materiales as M
WHERE E.RFC = P.RFC
AND E.clave = M.clave
GROUP BY P.RazonSocial
HAVING AVG(Cantidad) > 500;

-- Mostrar en una solo consulta los mismos datos que en la consulta anterior 
-- pero para dos grupos de proveedores: aquellos para los que la cantidad promedio
-- entregada es menor a 370 y aquellos para los que la cantidad promedio 
-- entregada sea mayor a 450.

SELECT P.RazonSocial, AVG(E.Cantidad) as ‘Cantidades’, M.clave, M.descripcion
FROM Proveedores as P, Entregan as E, Materiales as M
WHERE E.RFC = P.RFC
AND E.clave = M.clave
GROUP BY P.RazonSocial
HAVING AVG(Cantidad) < 370
OR AVG(Cantidad) > 450;

-- Clave y descripción de los materiales que nunca han sido entregados.

SELECT m.clave, m.descripcion 
FROM materiales m
LEFT JOIN entregan e
  ON m.clave = e.clave
WHERE e.clave IS NULL;

-- Razón social de los proveedores que han realizado entregas tanto al 
-- proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.

(SELECT p.razonsocial
FROM proveedores p
JOIN entregan e
  ON e.rfc = p.rfc
JOIN proyectos pr
  ON e.numero = pr.numero
WHERE pr.denominacion = 'Querétaro Limpio')
UNION
(SELECT p.razonsocial
FROM proveedores p
JOIN entregan e
  ON e.rfc = p.rfc
JOIN proyectos pr
  ON e.numero = pr.numero
WHERE pr.denominacion = 'Vamos México')

-- Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'

SELECT m.descripcion
FROM materiales m
LEFT JOIN entregan e
  ON e.clave = m.clave
LEFT JOIN proyectos p
  ON p.numero = e.numero
WHERE p.numero IS NULL;

-- Razón social y promedio de cantidad entregada de los proveedores cuyo 
-- promedio de cantidad entregada es mayor al promedio de la cantidad 
-- entregada por el proveedor con el RFC 'VAGO780901'

SELECT p.razonsocial, AVG(e.numero)
FROM proveedores p
JOIN entregan e
  ON e.rfc = p.rfc
HAVING AVG(e.numero) > (
  SELECT AVG(e.numero)
  FROM proveedores p
  JOIN entregan e
    ON e.rfc = p.rfc
  WHERE p.rfc = 'VAGO780901'
    );

-- RFC, razón social de los proveedores que participaron en el 
-- proyecto 'Infonavit Durango' y cuyas cantidades totales 
-- entregadas en el 2000 fueron mayores a las cantidades totales 
-- entregadas en el 2001.

SELECT p.RFC, p.RazonSocial
FROM Proveedores p
JOIN Entregan e1 ON p.RFC = e1.RFC
JOIN Proyectos pr ON e1.Numero = pr.Numero
LEFT JOIN Entregan e2 ON p.RFC = e2.RFC AND e2.Numero = pr.Numero AND YEAR(e2.Fecha) = 2001
WHERE pr.Denominacion = 'Infonavit Durango'
AND YEAR(e1.Fecha) = 2000
GROUP BY p.RFC, p.RazonSocial
HAVING SUM(CASE WHEN YEAR(e1.Fecha) = 2000 THEN e1.Cantidad ELSE 0 END) >
       SUM(CASE WHEN YEAR(e2.Fecha) = 2001 THEN e2.Cantidad ELSE 0 END);
