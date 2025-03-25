DROP PROCEDURE insertAbscence;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAbscence`(IN id_solicitud_falta INT, IN fecha DATE)
BEGIN
  INSERT INTO dias_solicitados VALUES(id_solicitud_falta, fecha);
END

DROP FUNCTION getTotalCollabs;
CREATE DEFINER=`root`@`localhost` FUNCTION `getTotalCollabs`() RETURNS int(11)
    READS SQL DATA
BEGIN
    DECLARE total INT;
    SET total = (SELECT COUNT(*) FROM colaborador);

    return total;
END

SELECT getTotalCollabs();
CALL insertAbscence(1, '2025-01-15');