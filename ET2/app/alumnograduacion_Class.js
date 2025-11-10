class alumnograduacion extends EntidadAbstracta {

    constructor(esTest) {
        super(esTest);

        this.columnasamostrar = ['dni_alumno', 'cod_titulacion', 'anio_academico', 'nota_final'];
        this.mostrarespecial = ['fecha_defensa', 'memoria_pdf'];

        this.attributes = [
            'dni_alumno',
            'cod_titulacion',
            'nombre_trabajo',
            'anio_academico',
            'nota_final',
            'tutor_principal',
            'fecha_defensa',
            'memoria_pdf',
            'nuevo_memoria_pdf'
        ];

        this.camposFormulario = [
            'dni_alumno',
            'cod_titulacion',
            'nombre_trabajo',
            'anio_academico',
            'nota_final',
            'tutor_principal',
            'fecha_defensa',
            'memoria_pdf'
        ];
    }

    obtenerValorCampo(fila, campo) {
        if (!fila) {
            return '';
        }

        if (Object.prototype.hasOwnProperty.call(fila, campo)) {
            return fila[campo];
        }

        const coincidencia = Object.keys(fila).find(
            (clave) => clave.toLowerCase() === campo.toLowerCase()
        );

        if (coincidencia) {
            return fila[coincidencia];
        }

        return '';
    }

    normalizarFilaParaFormulario(fila) {
        const valores = {};

        this.camposFormulario.forEach((campo) => {
            valores[campo] = this.obtenerValorCampo(fila, campo);
        });

        if (valores.fecha_defensa) {
            valores.fecha_defensa = this.formatearFechaParaUsuario(valores.fecha_defensa);
        }

        return valores;
    }

    rellenarFormularioConFila(fila) {
        const valores = this.normalizarFilaParaFormulario(fila);

        Object.entries(valores).forEach(([campo, valor]) => {
            const elemento = document.getElementById(campo);

            if (elemento) {
                elemento.value = valor ?? '';
            }
        });
    }

    formatearFechaParaUsuario(valorEntrada) {
        if (!valorEntrada || typeof valorEntrada !== 'string') {
            return valorEntrada;
        }

        if (valorEntrada.includes('-')) {
            return this.mostrarcambioatributo('fecha_defensa', valorEntrada);
        }

        return valorEntrada;
    }

    configurarEnlaceMemoria(nombreFichero) {
        const enlace = document.getElementById('link_memoria_pdf');

        if (!enlace) {
            return;
        }

        if (nombreFichero) {
            this.dom.assign_property_value(
                'link_memoria_pdf',
                'href',
                'http://193.147.87.202/ET2/filesuploaded/files_memoria_pdf/' + nombreFichero
            );
            enlace.style.display = 'inline';
        } else {
            this.dom.assign_property_value('link_memoria_pdf', 'href', '');
            this.dom.hide_element('link_memoria_pdf');
        }
    }

    prepararDatosParaBack(convertirNota = true) {
        const fechaInput = document.getElementById('fecha_defensa');
        const notaInput = document.getElementById('nota_final');

        const valoresOriginales = {
            fecha_defensa: fechaInput ? fechaInput.value : '',
            nota_final: notaInput ? notaInput.value : ''
        };

        if (fechaInput && this.esFechaUsuario(fechaInput.value)) {
            fechaInput.value = this.formatearFechaParaBack(fechaInput.value);
        }

        if (convertirNota && notaInput && notaInput.value) {
            notaInput.value = notaInput.value.replace(',', '.');
        }

        return () => {
            const fechaRestaurar = document.getElementById('fecha_defensa');
            if (fechaRestaurar) {
                fechaRestaurar.value = valoresOriginales.fecha_defensa;
            }

            const notaRestaurar = document.getElementById('nota_final');
            if (notaRestaurar) {
                notaRestaurar.value = valoresOriginales.nota_final;
            }
        };
    }

    esFechaUsuario(valor) {
        return /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(valor);
    }

    formatearFechaParaBack(valor) {
        if (!this.esFechaUsuario(valor)) {
            return valor;
        }

        const [dia, mes, anyo] = valor.split('/');
        return `${anyo}-${mes}-${dia}`;
    }

    crearTablaDatos(datos, mostrarespeciales) {
        const filasOriginales = datos.map((fila) => ({ ...fila }));
        const filasTabla = datos.map((fila) => ({ ...fila }));

        if (mostrarespeciales.length > 0) {
            for (let i = 0; i < filasTabla.length; i++) {
                for (const clave in filasTabla[i]) {
                    if (mostrarespeciales.includes(clave)) {
                        filasTabla[i][clave] = this.mostrarcambioatributo(clave, filasTabla[i][clave]);
                    }
                }
            }
        }

        for (let i = 0; i < filasTabla.length; i++) {
            const originalFila = filasOriginales[i];
            const datosSerializados = encodeURIComponent(JSON.stringify(originalFila));
            const llamada = `JSON.parse(decodeURIComponent(\"${datosSerializados}\"))`;
            filasTabla[i].EDIT = `<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(${llamada});'>`;
            filasTabla[i].DELETE = `<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(${llamada});'>`;
            filasTabla[i].SHOWCURRENT = `<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(${llamada});'>`;
        }

        this.dom.showData('IU_manage_table', filasTabla);
        this.mostrarocultarcolumnas();
        this.dom.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
    }

    manual_form_creation() {
        return `
            <form id='form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>
                <label class='label_dni_alumno'>dni_alumno</label>
                <input type='text' id='dni_alumno' name='dni_alumno'/>
                <span id='span_error_dni_alumno'><a id='error_dni_alumno'></a></span>
                <br>
                <label class='label_cod_titulacion'>cod_titulacion</label>
                <input type='text' id='cod_titulacion' name='cod_titulacion'/>
                <span id='span_error_cod_titulacion'><a id='error_cod_titulacion'></a></span>
                <br>
                <label class='label_nombre_trabajo'>nombre_trabajo</label>
                <input type='text' id='nombre_trabajo' name='nombre_trabajo'/>
                <span id='span_error_nombre_trabajo'><a id='error_nombre_trabajo'></a></span>
                <br>
                <label class='label_anio_academico'>anio_academico</label>
                <input type='text' id='anio_academico' name='anio_academico'/>
                <span id='span_error_anio_academico'><a id='error_anio_academico'></a></span>
                <br>
                <label class='label_nota_final'>nota_final</label>
                <input type='text' id='nota_final' name='nota_final'/>
                <span id='span_error_nota_final'><a id='error_nota_final'></a></span>
                <br>
                <label class='label_tutor_principal'>tutor_principal</label>
                <input type='text' id='tutor_principal' name='tutor_principal'/>
                <span id='span_error_tutor_principal'><a id='error_tutor_principal'></a></span>
                <br>
                <label class='label_fecha_defensa'>fecha_defensa</label>
                <input type='text' id='fecha_defensa' name='fecha_defensa'/>
                <span id='span_error_fecha_defensa'><a id='error_fecha_defensa'></a></span>
                <br>
                <label id='label_memoria_pdf' class='label_memoria_pdf'>memoria_pdf</label>
                <input type='text' id='memoria_pdf' name='memoria_pdf'/>
                <span id='span_error_memoria_pdf'><a id='error_memoria_pdf'></a></span>
                <a id='link_memoria_pdf' href='' target='_blank'><img src='./iconos/FILE.png' /></a>
                <br>
                <label id='label_nuevo_memoria_pdf' class='label_nuevo_memoria_pdf'>nuevo_memoria_pdf</label>
                <input type='file' id='nuevo_memoria_pdf' name='nuevo_memoria_pdf'/>
                <span id='span_error_nuevo_memoria_pdf'><a id='error_nuevo_memoria_pdf'></a></span>
            </form>
        `;
    }

    mostrarcambioatributo(atributo, valorentrada) {
        switch (atributo) {
            case 'fecha_defensa':
                if (valorentrada && valorentrada.includes('-')) {
                    const partes = valorentrada.split('-');
                    return `${partes[2]}/${partes[1]}/${partes[0]}`;
                }
                return valorentrada;
            case 'memoria_pdf':
                if (valorentrada === '' || valorentrada === null || valorentrada === undefined) {
                    return '';
                }
                return `${valorentrada}  <a class='link_memoria_pdf' href='http://193.147.87.202/ET2/filesuploaded/files_memoria_pdf/${valorentrada}' target='_blank'><img src='./iconos/FILE.png' /></a>`;
            default:
                return valorentrada;
        }
    }

    createForm_ADD() {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_alumnograduacion_ADD');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.ADD_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

        this.dom.hide_element_form('memoria_pdf');
        this.dom.hide_element('link_memoria_pdf');
        document.getElementById('label_nuevo_memoria_pdf').style.display = 'block';
        document.getElementById('nuevo_memoria_pdf').style.display = 'block';

        this.dom.colocarvalidaciones('form_iu', 'ADD');
        this.dom.colocarboton('ADD');
        setLang();
    }

    createForm_EDIT(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_alumnograduacion_EDIT');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.EDIT_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

        this.rellenarFormularioConFila(fila);
        this.configurarEnlaceMemoria(this.obtenerValorCampo(fila, 'memoria_pdf'));

        this.dom.colocarvalidaciones('form_iu', 'EDIT');

        this.dom.assign_property_value('memoria_pdf', 'readonly', 'true');
        document.getElementById('label_nuevo_memoria_pdf').style.display = 'block';
        document.getElementById('nuevo_memoria_pdf').style.display = 'block';

        this.dom.colocarboton('EDIT');
        setLang();
    }

    createForm_DELETE(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_alumnograduacion_DELETE');

        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

        this.rellenarFormularioConFila(fila);
        this.configurarEnlaceMemoria(this.obtenerValorCampo(fila, 'memoria_pdf'));

        this.dom.colocartodosreadonly('form_iu');
        this.dom.hide_element_form('nuevo_memoria_pdf');
        this.dom.hide_element('label_nuevo_memoria_pdf');

        this.dom.colocarboton('DELETE');
        setLang();
    }

    createForm_SHOWCURRENT(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_alumnograduacion_SHOWCURRENT');

        this.rellenarFormularioConFila(fila);
        this.configurarEnlaceMemoria(this.obtenerValorCampo(fila, 'memoria_pdf'));

        this.dom.colocartodosreadonly('form_iu');
        this.dom.hide_element_form('nuevo_memoria_pdf');
        this.dom.hide_element('label_nuevo_memoria_pdf');
        setLang();
    }

    createForm_SEARCH() {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_alumnograduacion_SEARCH');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.SEARCH_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

        this.dom.hide_element_form('nuevo_memoria_pdf');
        this.dom.hide_element('label_nuevo_memoria_pdf');
        this.dom.hide_element('link_memoria_pdf');

        this.dom.colocarvalidaciones('form_iu', 'SEARCH');
        this.dom.colocarboton('SEARCH');
        setLang();
    }

    async ADD() {
        const restaurar = this.prepararDatosParaBack();
        await super.ADD();
        restaurar();
    }

    async EDIT() {
        const restaurar = this.prepararDatosParaBack();
        await super.EDIT();
        restaurar();
    }

    async SEARCH() {
        const restaurar = this.prepararDatosParaBack();
        await super.SEARCH();
        restaurar();
    }

    ADD_dni_alumno_validation() {
        if (!this.validations.format('dni_alumno', '^[0-9]{8}[A-Z]$')) {
            this.dom.mostrar_error_campo('dni_alumno', 'dni_alumno_format_KO');
            return 'dni_alumno_format_KO';
        }
        if (!this.personalize_validate_dni(document.getElementById('dni_alumno').value)) {
            this.dom.mostrar_error_campo('dni_alumno', 'dni_alumno_letter_KO');
            return 'dni_alumno_letter_KO';
        }
        this.dom.mostrar_exito_campo('dni_alumno');
        return true;
    }

    ADD_cod_titulacion_validation() {
        if (!this.validations.min_size('cod_titulacion', 3)) {
            this.dom.mostrar_error_campo('cod_titulacion', 'cod_titulacion_min_size_KO');
            return 'cod_titulacion_min_size_KO';
        }
        if (!this.validations.max_size('cod_titulacion', 10)) {
            this.dom.mostrar_error_campo('cod_titulacion', 'cod_titulacion_max_size_KO');
            return 'cod_titulacion_max_size_KO';
        }
        if (!this.validations.format('cod_titulacion', '^[A-Z0-9]+$')) {
            this.dom.mostrar_error_campo('cod_titulacion', 'cod_titulacion_format_KO');
            return 'cod_titulacion_format_KO';
        }
        this.dom.mostrar_exito_campo('cod_titulacion');
        return true;
    }

    ADD_nombre_trabajo_validation() {
        if (!this.validations.min_size('nombre_trabajo', 5)) {
            this.dom.mostrar_error_campo('nombre_trabajo', 'nombre_trabajo_min_size_KO');
            return 'nombre_trabajo_min_size_KO';
        }
        if (!this.validations.max_size('nombre_trabajo', 100)) {
            this.dom.mostrar_error_campo('nombre_trabajo', 'nombre_trabajo_max_size_KO');
            return 'nombre_trabajo_max_size_KO';
        }
        if (!this.validations.format('nombre_trabajo', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.\'-]+$")) {
            this.dom.mostrar_error_campo('nombre_trabajo', 'nombre_trabajo_format_KO');
            return 'nombre_trabajo_format_KO';
        }
        this.dom.mostrar_exito_campo('nombre_trabajo');
        return true;
    }

    ADD_anio_academico_validation() {
        const valor = document.getElementById('anio_academico').value;
        if (valor === '') {
            this.dom.mostrar_error_campo('anio_academico', 'anio_academico_format_KO');
            return 'anio_academico_format_KO';
        }
        if (!/^([0-9]{4})-([0-9]{4})$/.test(valor)) {
            this.dom.mostrar_error_campo('anio_academico', 'anio_academico_format_KO');
            return 'anio_academico_format_KO';
        }
        const partes = valor.split('-');
        if (parseInt(partes[1]) !== parseInt(partes[0]) + 1) {
            this.dom.mostrar_error_campo('anio_academico', 'anio_academico_range_KO');
            return 'anio_academico_range_KO';
        }
        this.dom.mostrar_exito_campo('anio_academico');
        return true;
    }

    ADD_nota_final_validation() {
        const valor = document.getElementById('nota_final').value;
        if (!this.validations.format('nota_final', '^[0-9]+([.,][0-9]{1,2})?$')) {
            this.dom.mostrar_error_campo('nota_final', 'nota_final_format_KO');
            return 'nota_final_format_KO';
        }
        const numero = parseFloat(valor.replace(',', '.'));
        if (numero < 0 || numero > 10) {
            this.dom.mostrar_error_campo('nota_final', 'nota_final_range_KO');
            return 'nota_final_range_KO';
        }
        this.dom.mostrar_exito_campo('nota_final');
        return true;
    }

    ADD_tutor_principal_validation() {
        if (!this.validations.min_size('tutor_principal', 4)) {
            this.dom.mostrar_error_campo('tutor_principal', 'tutor_principal_min_size_KO');
            return 'tutor_principal_min_size_KO';
        }
        if (!this.validations.max_size('tutor_principal', 60)) {
            this.dom.mostrar_error_campo('tutor_principal', 'tutor_principal_max_size_KO');
            return 'tutor_principal_max_size_KO';
        }
        if (!this.validations.format('tutor_principal', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$")) {
            this.dom.mostrar_error_campo('tutor_principal', 'tutor_principal_format_KO');
            return 'tutor_principal_format_KO';
        }
        this.dom.mostrar_exito_campo('tutor_principal');
        return true;
    }

    ADD_fecha_defensa_validation() {
        const valor = document.getElementById('fecha_defensa').value;
        if (!/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(valor)) {
            this.dom.mostrar_error_campo('fecha_defensa', 'fecha_defensa_format_KO');
            return 'fecha_defensa_format_KO';
        }
        const partes = valor.split('/');
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1;
        const anyo = parseInt(partes[2]);
        const fecha = new Date(anyo, mes, dia);
        if (fecha.getFullYear() !== anyo || fecha.getMonth() !== mes || fecha.getDate() !== dia) {
            this.dom.mostrar_error_campo('fecha_defensa', 'fecha_defensa_value_KO');
            return 'fecha_defensa_value_KO';
        }
        this.dom.mostrar_exito_campo('fecha_defensa');
        return true;
    }

    ADD_memoria_pdf_validation() {
        this.dom.mostrar_exito_campo('memoria_pdf');
        return true;
    }

    ADD_nuevo_memoria_pdf_validation() {
        if (!this.validations.not_exist_file('nuevo_memoria_pdf')) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_not_exist_file_KO');
            return 'nuevo_memoria_pdf_not_exist_file_KO';
        }
        if (!this.validations.type_file('nuevo_memoria_pdf', ['application/pdf'])) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_type_file_KO');
            return 'nuevo_memoria_pdf_type_file_KO';
        }
        if (!this.validations.max_size_file('nuevo_memoria_pdf', 5 * 1024 * 1024)) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_max_size_file_KO');
            return 'nuevo_memoria_pdf_max_size_file_KO';
        }
        if (!this.validations.format_name_file('nuevo_memoria_pdf', '^[A-Za-z0-9_.-]+$')) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_format_name_file_KO');
            return 'nuevo_memoria_pdf_format_name_file_KO';
        }
        this.dom.mostrar_exito_campo('nuevo_memoria_pdf');
        return true;
    }

    EDIT_dni_alumno_validation() {
        return this.ADD_dni_alumno_validation();
    }

    EDIT_cod_titulacion_validation() {
        return this.ADD_cod_titulacion_validation();
    }

    EDIT_nombre_trabajo_validation() {
        return this.ADD_nombre_trabajo_validation();
    }

    EDIT_anio_academico_validation() {
        return this.ADD_anio_academico_validation();
    }

    EDIT_nota_final_validation() {
        return this.ADD_nota_final_validation();
    }

    EDIT_tutor_principal_validation() {
        return this.ADD_tutor_principal_validation();
    }

    EDIT_fecha_defensa_validation() {
        return this.ADD_fecha_defensa_validation();
    }

    EDIT_memoria_pdf_validation() {
        return true;
    }

    EDIT_nuevo_memoria_pdf_validation() {
        if (!this.validations.not_exist_file('nuevo_memoria_pdf')) {
            this.dom.mostrar_exito_campo('nuevo_memoria_pdf');
            return true;
        }
        if (!this.validations.type_file('nuevo_memoria_pdf', ['application/pdf'])) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_type_file_KO');
            return 'nuevo_memoria_pdf_type_file_KO';
        }
        if (!this.validations.max_size_file('nuevo_memoria_pdf', 5 * 1024 * 1024)) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_max_size_file_KO');
            return 'nuevo_memoria_pdf_max_size_file_KO';
        }
        if (!this.validations.format_name_file('nuevo_memoria_pdf', '^[A-Za-z0-9_.-]+$')) {
            this.dom.mostrar_error_campo('nuevo_memoria_pdf', 'nuevo_memoria_pdf_format_name_file_KO');
            return 'nuevo_memoria_pdf_format_name_file_KO';
        }
        this.dom.mostrar_exito_campo('nuevo_memoria_pdf');
        return true;
    }

    SEARCH_dni_alumno_validation() {
        const valor = document.getElementById('dni_alumno').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('dni_alumno');
            return true;
        }
        if (!this.validations.format('dni_alumno', '^[0-9]{0,8}[A-Z]?$')) {
            this.dom.mostrar_error_campo('dni_alumno', 'dni_alumno_format_KO');
            return 'dni_alumno_format_KO';
        }
        this.dom.mostrar_exito_campo('dni_alumno');
        return true;
    }

    SEARCH_cod_titulacion_validation() {
        const valor = document.getElementById('cod_titulacion').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('cod_titulacion');
            return true;
        }
        if (!this.validations.format('cod_titulacion', '^[A-Z0-9]*$')) {
            this.dom.mostrar_error_campo('cod_titulacion', 'cod_titulacion_format_KO');
            return 'cod_titulacion_format_KO';
        }
        this.dom.mostrar_exito_campo('cod_titulacion');
        return true;
    }

    SEARCH_nombre_trabajo_validation() {
        const valor = document.getElementById('nombre_trabajo').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('nombre_trabajo');
            return true;
        }
        if (!this.validations.format('nombre_trabajo', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.\'-]*$")) {
            this.dom.mostrar_error_campo('nombre_trabajo', 'nombre_trabajo_format_KO');
            return 'nombre_trabajo_format_KO';
        }
        this.dom.mostrar_exito_campo('nombre_trabajo');
        return true;
    }

    SEARCH_anio_academico_validation() {
        const valor = document.getElementById('anio_academico').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('anio_academico');
            return true;
        }
        if (!/^([0-9]{4})(-([0-9]{0,4})?)?$/.test(valor)) {
            this.dom.mostrar_error_campo('anio_academico', 'anio_academico_format_KO');
            return 'anio_academico_format_KO';
        }
        this.dom.mostrar_exito_campo('anio_academico');
        return true;
    }

    SEARCH_nota_final_validation() {
        const valor = document.getElementById('nota_final').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('nota_final');
            return true;
        }
        if (!this.validations.format('nota_final', '^[0-9]+([.,][0-9]{0,2})?$')) {
            this.dom.mostrar_error_campo('nota_final', 'nota_final_format_KO');
            return 'nota_final_format_KO';
        }
        this.dom.mostrar_exito_campo('nota_final');
        return true;
    }

    SEARCH_tutor_principal_validation() {
        const valor = document.getElementById('tutor_principal').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('tutor_principal');
            return true;
        }
        if (!this.validations.format('tutor_principal', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]*$")) {
            this.dom.mostrar_error_campo('tutor_principal', 'tutor_principal_format_KO');
            return 'tutor_principal_format_KO';
        }
        this.dom.mostrar_exito_campo('tutor_principal');
        return true;
    }

    SEARCH_fecha_defensa_validation() {
        const valor = document.getElementById('fecha_defensa').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('fecha_defensa');
            return true;
        }
        if (!/^([0-9]{2})?(\/([0-9]{2})?(\/([0-9]{4})?)?)?$/.test(valor)) {
            this.dom.mostrar_error_campo('fecha_defensa', 'fecha_defensa_format_KO');
            return 'fecha_defensa_format_KO';
        }
        this.dom.mostrar_exito_campo('fecha_defensa');
        return true;
    }

    SEARCH_memoria_pdf_validation() {
        this.dom.mostrar_exito_campo('memoria_pdf');
        return true;
    }

    SEARCH_nuevo_memoria_pdf_validation() {
        return true;
    }

    ADD_submit_alumnograduacion() {
        let result = (
            this.ADD_dni_alumno_validation() &
            this.ADD_cod_titulacion_validation() &
            this.ADD_nombre_trabajo_validation() &
            this.ADD_anio_academico_validation() &
            this.ADD_nota_final_validation() &
            this.ADD_tutor_principal_validation() &
            this.ADD_fecha_defensa_validation() &
            this.ADD_nuevo_memoria_pdf_validation()
        );
        return Boolean(result);
    }

    EDIT_submit_alumnograduacion() {
        let result = (
            this.EDIT_cod_titulacion_validation() &
            this.EDIT_nombre_trabajo_validation() &
            this.EDIT_anio_academico_validation() &
            this.EDIT_nota_final_validation() &
            this.EDIT_tutor_principal_validation() &
            this.EDIT_fecha_defensa_validation() &
            this.EDIT_nuevo_memoria_pdf_validation()
        );
        return Boolean(result);
    }

    SEARCH_submit_alumnograduacion() {
        let result = (
            this.SEARCH_dni_alumno_validation() &
            this.SEARCH_cod_titulacion_validation() &
            this.SEARCH_nombre_trabajo_validation() &
            this.SEARCH_anio_academico_validation() &
            this.SEARCH_nota_final_validation() &
            this.SEARCH_tutor_principal_validation() &
            this.SEARCH_fecha_defensa_validation()
        );
        return Boolean(result);
    }

    personalize_validate_dni(dni) {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const numero = parseInt(dni.substring(0, 8), 10);
        const letraEsperada = letras.charAt(numero % 23);
        return letraEsperada === dni.charAt(8);
    }
}
