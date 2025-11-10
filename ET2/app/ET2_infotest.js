let alumnograduacion_def_tests = Array(
    ['alumnograduacion','dni_alumno','input',1,'El DNI debe respetar el formato y la letra de control','ADD','dni_alumno_format_KO','Formato incorrecto'],
    ['alumnograduacion','dni_alumno','input',2,'El DNI correcto supera la validación','ADD',true,'Valor correcto'],
    ['alumnograduacion','cod_titulacion','input',3,'El código de titulación solo admite mayúsculas y números','ADD','cod_titulacion_format_KO','Formato incorrecto'],
    ['alumnograduacion','cod_titulacion','input',4,'Código de titulación válido','ADD',true,'Valor correcto'],
    ['alumnograduacion','nombre_trabajo','input',5,'El título debe tener longitud suficiente','ADD','nombre_trabajo_min_size_KO','Longitud insuficiente'],
    ['alumnograduacion','nombre_trabajo','input',6,'Título válido','ADD',true,'Valor correcto'],
    ['alumnograduacion','anio_academico','input',7,'El curso académico sigue el formato AAAA-AAAA','ADD','anio_academico_format_KO','Formato incorrecto'],
    ['alumnograduacion','anio_academico','input',8,'Curso académico válido','ADD',true,'Valor correcto'],
    ['alumnograduacion','nota_final','input',9,'La nota debe ser numérica entre 0 y 10','ADD','nota_final_range_KO','Valor fuera de rango'],
    ['alumnograduacion','nota_final','input',10,'Nota válida','ADD',true,'Valor correcto'],
    ['alumnograduacion','tutor_principal','input',11,'El nombre del tutor solo permite letras y espacios','ADD','tutor_principal_format_KO','Formato incorrecto'],
    ['alumnograduacion','tutor_principal','input',12,'Tutor válido','ADD',true,'Valor correcto'],
    ['alumnograduacion','fecha_defensa','input',13,'La fecha debe existir en formato dd/mm/aaaa','ADD','fecha_defensa_value_KO','Fecha incorrecta'],
    ['alumnograduacion','fecha_defensa','input',14,'Fecha válida','ADD',true,'Valor correcto'],
    ['alumnograduacion','nuevo_memoria_pdf','inputfile',15,'El fichero PDF es obligatorio','ADD','nuevo_memoria_pdf_not_exist_file_KO','Fichero ausente'],
    ['alumnograduacion','nuevo_memoria_pdf','inputfile',16,'Fichero PDF correcto','ADD',true,'Fichero válido'],
    ['alumnograduacion','nuevo_memoria_pdf','inputfile',17,'En edición no es obligatorio subir fichero','EDIT',true,'Fichero opcional']
);

let alumnograduacion_tests_fields = Array(
    ['alumnograduacion','dni_alumno',1,1,'ADD',[{dni_alumno:'1234A'}],'dni_alumno_format_KO'],
    ['alumnograduacion','dni_alumno',2,2,'ADD',[{dni_alumno:'12345678Z'}],true],
    ['alumnograduacion','cod_titulacion',3,3,'ADD',[{cod_titulacion:'abc'}],'cod_titulacion_format_KO'],
    ['alumnograduacion','cod_titulacion',4,4,'ADD',[{cod_titulacion:'GREI'}],true],
    ['alumnograduacion','nombre_trabajo',5,5,'ADD',[{nombre_trabajo:'abc'}],'nombre_trabajo_min_size_KO'],
    ['alumnograduacion','nombre_trabajo',6,6,'ADD',[{nombre_trabajo:'Proyecto Final'}],true],
    ['alumnograduacion','anio_academico',7,7,'ADD',[{anio_academico:'2023-2025'}],'anio_academico_range_KO'],
    ['alumnograduacion','anio_academico',8,8,'ADD',[{anio_academico:'2023-2024'}],true],
    ['alumnograduacion','nota_final',9,9,'ADD',[{nota_final:'12'}],'nota_final_range_KO'],
    ['alumnograduacion','nota_final',10,10,'ADD',[{nota_final:'9.5'}],true],
    ['alumnograduacion','tutor_principal',11,11,'ADD',[{tutor_principal:'Juan 123'}],'tutor_principal_format_KO'],
    ['alumnograduacion','tutor_principal',12,12,'ADD',[{tutor_principal:'María Pérez'}],true],
    ['alumnograduacion','fecha_defensa',13,13,'ADD',[{fecha_defensa:'31/02/2024'}],'fecha_defensa_value_KO'],
    ['alumnograduacion','fecha_defensa',14,14,'ADD',[{fecha_defensa:'15/06/2024'}],true]
);

let alumnograduacion_tests_files = Array(
    ['alumnograduacion','nuevo_memoria_pdf',15,1,'ADD',[], 'nuevo_memoria_pdf_not_exist_file_KO'],
    ['alumnograduacion','nuevo_memoria_pdf',16,2,'ADD',[{format_name_file:'memoria.pdf'},{type_file:'application/pdf'},{max_size_file:4096}],true],
    ['alumnograduacion','nuevo_memoria_pdf',17,3,'EDIT',[],true]
);

let articulo_def_tests = Array(
    ['articulo','CodigoA','input',1,'El código solo admite números','ADD','CodigoA_format_KO','Formato incorrecto'],
    ['articulo','CodigoA','input',2,'Código correcto','ADD',true,'Valor correcto'],
    ['articulo','AutoresA','input',3,'Los autores deben usar letras y separadores','ADD','AutoresA_format_KO','Formato incorrecto'],
    ['articulo','AutoresA','input',4,'Autores válidos','ADD',true,'Valor correcto'],
    ['articulo','TituloA','input',5,'Título obligatorio con caracteres permitidos','ADD','TituloA_format_KO','Formato incorrecto'],
    ['articulo','TituloA','input',6,'Título válido','ADD',true,'Valor correcto'],
    ['articulo','ISSN','input',7,'El ISSN sigue el patrón 0000-000X','ADD','ISSN_format_KO','Formato incorrecto'],
    ['articulo','ISSN','input',8,'ISSN válido','ADD',true,'Valor correcto'],
    ['articulo','PagFinA','input',9,'La página final debe ser mayor o igual que la inicial','ADD','PagFinA_range_KO','Rango incorrecto'],
    ['articulo','PagFinA','input',10,'Rango correcto','ADD',true,'Valor correcto'],
    ['articulo','FechaPublicacionR','input',11,'La fecha debe existir','ADD','FechaPublicacionR_value_KO','Fecha incorrecta'],
    ['articulo','FechaPublicacionR','input',12,'Fecha válida','ADD',true,'Valor correcto'],
    ['articulo','EstadoA','select',13,'El estado debe ser uno de los permitidos','ADD','EstadoA_value_KO','Estado incorrecto'],
    ['articulo','EstadoA','select',14,'Estado válido','ADD',true,'Valor correcto'],
    ['articulo','nuevo_FicheropdfA','inputfile',15,'El PDF es obligatorio','ADD','nuevo_FicheropdfA_not_exist_file_KO','Fichero ausente'],
    ['articulo','nuevo_FicheropdfA','inputfile',16,'PDF correcto','ADD',true,'Fichero válido'],
    ['articulo','nuevo_FicheropdfA','inputfile',17,'En edición el fichero es opcional','EDIT',true,'Fichero opcional']
);

let articulo_tests_fields = Array(
    ['articulo','CodigoA',1,1,'ADD',[{CodigoA:'ABC'}],'CodigoA_format_KO'],
    ['articulo','CodigoA',2,2,'ADD',[{CodigoA:'123'}],true],
    ['articulo','AutoresA',3,3,'ADD',[{AutoresA:'Autor1;Autor2'}],'AutoresA_format_KO'],
    ['articulo','AutoresA',4,4,'ADD',[{AutoresA:'Autor Uno, Autor Dos'}],true],
    ['articulo','TituloA',5,5,'ADD',[{TituloA:'Título @'}],'TituloA_format_KO'],
    ['articulo','TituloA',6,6,'ADD',[{TituloA:'Título válido'}],true],
    ['articulo','ISSN',7,7,'ADD',[{ISSN:'12345678'}],'ISSN_format_KO'],
    ['articulo','ISSN',8,8,'ADD',[{ISSN:'1234-567X'}],true],
    ['articulo','PagFinA',9,9,'ADD',[{PagIniA:'10'},{PagFinA:'5'}],'PagFinA_range_KO'],
    ['articulo','PagFinA',10,10,'ADD',[{PagIniA:'5'},{PagFinA:'10'}],true],
    ['articulo','FechaPublicacionR',11,11,'ADD',[{FechaPublicacionR:'31/02/2024'}],'FechaPublicacionR_value_KO'],
    ['articulo','FechaPublicacionR',12,12,'ADD',[{FechaPublicacionR:'20/05/2024'}],true],
    ['articulo','EstadoA',13,13,'ADD',[{EstadoA:'Borrador'}],'EstadoA_value_KO'],
    ['articulo','EstadoA',14,14,'ADD',[{EstadoA:'Revision'}],true]
);

let articulo_tests_files = Array(
    ['articulo','nuevo_FicheropdfA',15,1,'ADD',[], 'nuevo_FicheropdfA_not_exist_file_KO'],
    ['articulo','nuevo_FicheropdfA',16,2,'ADD',[{format_name_file:'articulo.pdf'},{type_file:'application/pdf'},{max_size_file:10240}],true],
    ['articulo','nuevo_FicheropdfA',17,3,'EDIT',[],true]
);

let ubicacion_def_tests = Array(
    ['ubicacion','id_site','input',1,'El identificador debe ser numérico','ADD','id_site_format_KO','Formato incorrecto'],
    ['ubicacion','id_site','input',2,'Identificador válido','ADD',true,'Valor correcto'],
    ['ubicacion','site_latitud','input',3,'La latitud sigue el formato decimal','ADD','site_latitud_format_KO','Formato incorrecto'],
    ['ubicacion','site_latitud','input',4,'Latitud válida','ADD',true,'Valor correcto'],
    ['ubicacion','site_longitud','input',5,'La longitud sigue el formato decimal','ADD','site_longitud_format_KO','Formato incorrecto'],
    ['ubicacion','site_longitud','input',6,'Longitud válida','ADD',true,'Valor correcto'],
    ['ubicacion','site_altitude','input',7,'Altitud dentro del rango permitido','ADD','site_altitude_range_KO','Rango incorrecto'],
    ['ubicacion','site_altitude','input',8,'Altitud válida','ADD',true,'Valor correcto'],
    ['ubicacion','site_locality','input',9,'Localidad solo con letras','ADD','site_locality_format_KO','Formato incorrecto'],
    ['ubicacion','site_locality','input',10,'Localidad válida','ADD',true,'Valor correcto'],
    ['ubicacion','site_provider_login','input',11,'Login con caracteres permitidos','ADD','site_provider_login_format_KO','Formato incorrecto'],
    ['ubicacion','site_provider_login','input',12,'Login válido','ADD',true,'Valor correcto'],
    ['ubicacion','nuevo_site_north_photo','inputfile',13,'Foto norte obligatoria','ADD','nuevo_site_north_photo_not_exist_file_KO','Fichero ausente'],
    ['ubicacion','nuevo_site_south_photo','inputfile',14,'Foto sur obligatoria','ADD','nuevo_site_south_photo_not_exist_file_KO','Fichero ausente'],
    ['ubicacion','nuevo_site_east_photo','inputfile',15,'Foto este obligatoria','ADD','nuevo_site_east_photo_not_exist_file_KO','Fichero ausente'],
    ['ubicacion','nuevo_site_west_photo','inputfile',16,'Foto oeste obligatoria','ADD','nuevo_site_west_photo_not_exist_file_KO','Fichero ausente'],
    ['ubicacion','nuevo_site_north_photo','inputfile',17,'Foto norte opcional en edición','EDIT',true,'Fichero opcional']
);

let ubicacion_tests_fields = Array(
    ['ubicacion','id_site',1,1,'ADD',[{id_site:'ABC'}],'id_site_format_KO'],
    ['ubicacion','id_site',2,2,'ADD',[{id_site:'10'}],true],
    ['ubicacion','site_latitud',3,3,'ADD',[{site_latitud:'95.000000'}],'site_latitud_range_KO'],
    ['ubicacion','site_latitud',4,4,'ADD',[{site_latitud:'42.123456'}],true],
    ['ubicacion','site_longitud',5,5,'ADD',[{site_longitud:'200.000000'}],'site_longitud_range_KO'],
    ['ubicacion','site_longitud',6,6,'ADD',[{site_longitud:'-8.542300'}],true],
    ['ubicacion','site_altitude',7,7,'ADD',[{site_altitude:'-600'}],'site_altitude_range_KO'],
    ['ubicacion','site_altitude',8,8,'ADD',[{site_altitude:'350'}],true],
    ['ubicacion','site_locality',9,9,'ADD',[{site_locality:'V1go'}],'site_locality_format_KO'],
    ['ubicacion','site_locality',10,10,'ADD',[{site_locality:'Vigo'}],true],
    ['ubicacion','site_provider_login',11,11,'ADD',[{site_provider_login:'login@'}],'site_provider_login_format_KO'],
    ['ubicacion','site_provider_login',12,12,'ADD',[{site_provider_login:'proveedor_01'}],true]
);

let ubicacion_tests_files = Array(
    ['ubicacion','nuevo_site_north_photo',13,1,'ADD',[], 'nuevo_site_north_photo_not_exist_file_KO'],
    ['ubicacion','nuevo_site_north_photo',17,2,'EDIT',[],true],
    ['ubicacion','nuevo_site_south_photo',14,3,'ADD',[], 'nuevo_site_south_photo_not_exist_file_KO'],
    ['ubicacion','nuevo_site_east_photo',15,4,'ADD',[], 'nuevo_site_east_photo_not_exist_file_KO'],
    ['ubicacion','nuevo_site_west_photo',16,5,'ADD',[], 'nuevo_site_west_photo_not_exist_file_KO'],
    ['ubicacion','nuevo_site_north_photo',13,6,'ADD',[{format_name_file:'foto.jpg'},{type_file:'image/jpeg'},{max_size_file:2048}],true]
);
