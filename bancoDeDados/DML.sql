----------------------------------DML-----------------------------------------------

INSERT INTO estacao (descricao) VALUES ('Estação A');

INSERT INTO peca (tipo_material) VALUES ('refugo');
INSERT INTO peca (tipo_material) VALUES ('metal');
INSERT INTO peca (tipo_material) VALUES ('plastico');

INSERT INTO sensor (tipo_sensor, id_estacao, descricao) VALUES ('atuador', 1, 'Atuador Estação A');
INSERT INTO sensor (tipo_sensor, id_estacao, descricao) VALUES ('capacitivo', 1, 'Sensor capacitivo Estação A');
INSERT INTO sensor (tipo_sensor, id_estacao, descricao) VALUES ('indutivo', 1, 'Sensor indutivo Estação A');

INSERT INTO estacao_estado (id_estacao, estado) VALUES (1, true);

INSERT INTO ciclo (id_peca, id_estacao) VALUES (1, 1);
INSERT INTO ciclo (id_peca, id_estacao) VALUES (2, 1);

INSERT INTO deteccao_sensor (id_sensor) VALUES (1);
INSERT INTO deteccao_sensor (id_sensor) VALUES (2);
INSERT INTO deteccao_sensor (id_sensor) VALUES (3);

INSERT INTO login (nome, senha) VALUES ('admin', 'senha123');

---Lista os sensores, tipos e as descrições das estações que estão-----

SELECT sensor.id_sensor, sensor.tipo_sensor, estacao.descricao
FROM sensor, estacao
WHERE sensor.id_estacao = estacao.id_estacao;


---Ciclos, tipo de material da peça e estação-----

SELECT id_ciclo, tipo_material, descricao AS estacao
FROM ciclo, peca, estacao
WHERE ciclo.id_peca = peca.id_peca
  AND ciclo.id_estacao = estacao.id_estacao;

----------Estado das estações-----------
SELECT descricao, estado, timestamp_estado
FROM estacao_estado, estacao
WHERE estacao_estado.id_estacao = estacao.id_estacao;