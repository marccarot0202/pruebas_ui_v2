class articulo extends EntidadAbstracta {

    constructor(esTest) {
        super(esTest);

        this.columnasamostrar = ['CodigoA', 'AutoresA', 'TituloA', 'TituloR', 'EstadoA'];
        this.mostrarespecial = ['FechaPublicacionR', 'FicheropdfA'];

        this.attributes = [
            'CodigoA',
            'AutoresA',
            'TituloA',
            'TituloR',
            'ISSN',
            'VolumenR',
            'PagIniA',
            'PagFinA',
            'FechaPublicacionR',
            'FicheropdfA',
            'nuevo_FicheropdfA',
            'EstadoA'
        ];

        this.camposFormulario = [
            'CodigoA',
            'AutoresA',
            'TituloA',
            'TituloR',
            'ISSN',
            'VolumenR',
            'PagIniA',
            'PagFinA',
            'FechaPublicacionR',
            'FicheropdfA',
            'EstadoA'
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

        if (valores.FechaPublicacionR) {
            valores.FechaPublicacionR = this.formatearFechaParaUsuario(valores.FechaPublicacionR);
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
            return this.mostrarcambioatributo('FechaPublicacionR', valorEntrada);
        }

        return valorEntrada;
    }

    configurarEnlaceFichero(nombreFichero) {
        const enlace = document.getElementById('link_FicheropdfA');

        if (!enlace) {
            return;
        }

        if (nombreFichero) {
            this.dom.assign_property_value(
                'link_FicheropdfA',
                'href',
                'http://193.147.87.202/ET2/filesuploaded/files_FicheropdfA/' + nombreFichero
            );
            enlace.style.display = 'inline';
        } else {
            this.dom.assign_property_value('link_FicheropdfA', 'href', '');
            this.dom.hide_element('link_FicheropdfA');
        }
    }

    prepararDatosParaBack() {
        const fechaInput = document.getElementById('FechaPublicacionR');

        const valoresOriginales = {
            FechaPublicacionR: fechaInput ? fechaInput.value : ''
        };

        if (fechaInput && this.esFechaUsuario(fechaInput.value)) {
            fechaInput.value = this.formatearFechaParaBack(fechaInput.value);
        }

        return () => {
            const fechaRestaurar = document.getElementById('FechaPublicacionR');
            if (fechaRestaurar) {
                fechaRestaurar.value = valoresOriginales.FechaPublicacionR;
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
                <label class='label_CodigoA'>CodigoA</label>
                <input type='text' id='CodigoA' name='CodigoA'/>
                <span id='span_error_CodigoA'><a id='error_CodigoA'></a></span>
                <br>
                <label class='label_AutoresA'>AutoresA</label>
                <input type='text' id='AutoresA' name='AutoresA'/>
                <span id='span_error_AutoresA'><a id='error_AutoresA'></a></span>
                <br>
                <label class='label_TituloA'>TituloA</label>
                <input type='text' id='TituloA' name='TituloA'/>
                <span id='span_error_TituloA'><a id='error_TituloA'></a></span>
                <br>
                <label class='label_TituloR'>TituloR</label>
                <input type='text' id='TituloR' name='TituloR'/>
                <span id='span_error_TituloR'><a id='error_TituloR'></a></span>
                <br>
                <label class='label_ISSN'>ISSN</label>
                <input type='text' id='ISSN' name='ISSN'/>
                <span id='span_error_ISSN'><a id='error_ISSN'></a></span>
                <br>
                <label class='label_VolumenR'>VolumenR</label>
                <input type='text' id='VolumenR' name='VolumenR'/>
                <span id='span_error_VolumenR'><a id='error_VolumenR'></a></span>
                <br>
                <label class='label_PagIniA'>PagIniA</label>
                <input type='text' id='PagIniA' name='PagIniA'/>
                <span id='span_error_PagIniA'><a id='error_PagIniA'></a></span>
                <br>
                <label class='label_PagFinA'>PagFinA</label>
                <input type='text' id='PagFinA' name='PagFinA'/>
                <span id='span_error_PagFinA'><a id='error_PagFinA'></a></span>
                <br>
                <label class='label_FechaPublicacionR'>FechaPublicacionR</label>
                <input type='text' id='FechaPublicacionR' name='FechaPublicacionR'/>
                <span id='span_error_FechaPublicacionR'><a id='error_FechaPublicacionR'></a></span>
                <br>
                <label id='label_FicheropdfA' class='label_FicheropdfA'>FicheropdfA</label>
                <input type='text' id='FicheropdfA' name='FicheropdfA'/>
                <span id='span_error_FicheropdfA'><a id='error_FicheropdfA'></a></span>
                <a id='link_FicheropdfA' href='' target='_blank'><img src='./iconos/FILE.png' /></a>
                <br>
                <label id='label_nuevo_FicheropdfA' class='label_nuevo_FicheropdfA'>nuevo_FicheropdfA</label>
                <input type='file' id='nuevo_FicheropdfA' name='nuevo_FicheropdfA'/>
                <span id='span_error_nuevo_FicheropdfA'><a id='error_nuevo_FicheropdfA'></a></span>
                <br>
                <label class='label_EstadoA'>EstadoA</label>
                <select id='EstadoA' name='EstadoA'>
                    <option value=''>--</option>
                    <option value='Enviado'>Enviado</option>
                    <option value='Revision'>Revision</option>
                    <option value='Publicado'>Publicado</option>
                </select>
                <span id='span_error_EstadoA'><a id='error_EstadoA'></a></span>
            </form>
        `;
    }

    mostrarcambioatributo(atributo, valorentrada) {
        switch (atributo) {
            case 'FechaPublicacionR':
                if (valorentrada && valorentrada.includes('-')) {
                    const partes = valorentrada.split('-');
                    return `${partes[2]}/${partes[1]}/${partes[0]}`;
                }
                return valorentrada;
            case 'FicheropdfA':
                if (!valorentrada) {
                    return '';
                }
                return `${valorentrada}  <a class='link_FicheropdfA' href='http://193.147.87.202/ET2/filesuploaded/files_FicheropdfA/${valorentrada}' target='_blank'><img src='./iconos/FILE.png' /></a>`;
            default:
                return valorentrada;
        }
    }

    createForm_ADD() {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_articulo_ADD');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.ADD_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

        this.dom.hide_element_form('FicheropdfA');
        this.dom.hide_element('link_FicheropdfA');
        document.getElementById('label_nuevo_FicheropdfA').style.display = 'block';
        document.getElementById('nuevo_FicheropdfA').style.display = 'block';

        this.dom.colocarvalidaciones('form_iu', 'ADD');
        this.dom.colocarboton('ADD');
        setLang();
    }

    createForm_EDIT(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_articulo_EDIT');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.EDIT_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

        this.rellenarFormularioConFila(fila);
        this.configurarEnlaceFichero(this.obtenerValorCampo(fila, 'FicheropdfA'));

        this.dom.colocarvalidaciones('form_iu', 'EDIT');

        this.dom.assign_property_value('FicheropdfA', 'readonly', 'true');
        document.getElementById('label_nuevo_FicheropdfA').style.display = 'block';
        document.getElementById('nuevo_FicheropdfA').style.display = 'block';

        this.dom.colocarboton('EDIT');
        setLang();
    }

    createForm_DELETE(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_articulo_DELETE');

        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

        this.rellenarFormularioConFila(fila);
        this.configurarEnlaceFichero(this.obtenerValorCampo(fila, 'FicheropdfA'));

        this.dom.colocartodosreadonly('form_iu');
        this.dom.hide_element_form('nuevo_FicheropdfA');
        this.dom.hide_element('label_nuevo_FicheropdfA');

        this.dom.colocarboton('DELETE');
        setLang();
    }

    createForm_SHOWCURRENT(fila) {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_articulo_SHOWCURRENT');

        this.rellenarFormularioConFila(fila);
        this.configurarEnlaceFichero(this.obtenerValorCampo(fila, 'FicheropdfA'));

        this.dom.colocartodosreadonly('form_iu');
        this.dom.hide_element_form('nuevo_FicheropdfA');
        this.dom.hide_element('label_nuevo_FicheropdfA');
        setLang();
    }

    createForm_SEARCH() {
        document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
        this.dom.show_element('Div_IU_form', 'block');
        this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
        this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_articulo_SEARCH');

        this.dom.assign_property_value('form_iu', 'onsubmit', 'return entidad.SEARCH_submit_' + this.nombreentidad + '()');
        this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

        this.dom.hide_element_form('nuevo_FicheropdfA');
        this.dom.hide_element('label_nuevo_FicheropdfA');
        this.dom.hide_element('link_FicheropdfA');
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

    ADD_CodigoA_validation() {
        if (!this.validations.min_size('CodigoA', 1)) {
            this.dom.mostrar_error_campo('CodigoA', 'CodigoA_min_size_KO');
            return 'CodigoA_min_size_KO';
        }
        if (!this.validations.format('CodigoA', '^[0-9]{1,11}$')) {
            this.dom.mostrar_error_campo('CodigoA', 'CodigoA_format_KO');
            return 'CodigoA_format_KO';
        }
        this.dom.mostrar_exito_campo('CodigoA');
        return true;
    }

    ADD_AutoresA_validation() {
        if (!this.validations.min_size('AutoresA', 1)) {
            this.dom.mostrar_error_campo('AutoresA', 'AutoresA_min_size_KO');
            return 'AutoresA_min_size_KO';
        }
        if (!this.validations.max_size('AutoresA', 200)) {
            this.dom.mostrar_error_campo('AutoresA', 'AutoresA_max_size_KO');
            return 'AutoresA_max_size_KO';
        }
        if (!this.validations.format('AutoresA', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ,.]+$")) {
            this.dom.mostrar_error_campo('AutoresA', 'AutoresA_format_KO');
            return 'AutoresA_format_KO';
        }
        this.dom.mostrar_exito_campo('AutoresA');
        return true;
    }

    ADD_TituloA_validation() {
        if (!this.validations.min_size('TituloA', 1)) {
            this.dom.mostrar_error_campo('TituloA', 'TituloA_min_size_KO');
            return 'TituloA_min_size_KO';
        }
        if (!this.validations.max_size('TituloA', 100)) {
            this.dom.mostrar_error_campo('TituloA', 'TituloA_max_size_KO');
            return 'TituloA_max_size_KO';
        }
        if (!this.validations.format('TituloA', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.\'-]+$")) {
            this.dom.mostrar_error_campo('TituloA', 'TituloA_format_KO');
            return 'TituloA_format_KO';
        }
        this.dom.mostrar_exito_campo('TituloA');
        return true;
    }

    ADD_TituloR_validation() {
        if (!this.validations.min_size('TituloR', 1)) {
            this.dom.mostrar_error_campo('TituloR', 'TituloR_min_size_KO');
            return 'TituloR_min_size_KO';
        }
        if (!this.validations.max_size('TituloR', 100)) {
            this.dom.mostrar_error_campo('TituloR', 'TituloR_max_size_KO');
            return 'TituloR_max_size_KO';
        }
        if (!this.validations.format('TituloR', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.\'-]+$")) {
            this.dom.mostrar_error_campo('TituloR', 'TituloR_format_KO');
            return 'TituloR_format_KO';
        }
        this.dom.mostrar_exito_campo('TituloR');
        return true;
    }

    ADD_ISSN_validation() {
        const valor = document.getElementById('ISSN').value;
        if (valor === '') {
            this.dom.mostrar_error_campo('ISSN', 'ISSN_min_size_KO');
            return 'ISSN_min_size_KO';
        }
        if (!this.validations.format('ISSN', '^[0-9]{4}-[0-9]{3}[0-9X]$')) {
            this.dom.mostrar_error_campo('ISSN', 'ISSN_format_KO');
            return 'ISSN_format_KO';
        }
        this.dom.mostrar_exito_campo('ISSN');
        return true;
    }

    ADD_VolumenR_validation() {
        if (!this.validations.min_size('VolumenR', 1)) {
            this.dom.mostrar_error_campo('VolumenR', 'VolumenR_min_size_KO');
            return 'VolumenR_min_size_KO';
        }
        if (!this.validations.format('VolumenR', '^[0-9]{1,4}$')) {
            this.dom.mostrar_error_campo('VolumenR', 'VolumenR_format_KO');
            return 'VolumenR_format_KO';
        }
        this.dom.mostrar_exito_campo('VolumenR');
        return true;
    }

    ADD_PagIniA_validation() {
        if (!this.validations.min_size('PagIniA', 1)) {
            this.dom.mostrar_error_campo('PagIniA', 'PagIniA_min_size_KO');
            return 'PagIniA_min_size_KO';
        }
        if (!this.validations.format('PagIniA', '^[0-9]{1,4}$')) {
            this.dom.mostrar_error_campo('PagIniA', 'PagIniA_format_KO');
            return 'PagIniA_format_KO';
        }
        this.dom.mostrar_exito_campo('PagIniA');
        return true;
    }

    ADD_PagFinA_validation() {
        if (!this.validations.min_size('PagFinA', 1)) {
            this.dom.mostrar_error_campo('PagFinA', 'PagFinA_min_size_KO');
            return 'PagFinA_min_size_KO';
        }
        if (!this.validations.format('PagFinA', '^[0-9]{1,4}$')) {
            this.dom.mostrar_error_campo('PagFinA', 'PagFinA_format_KO');
            return 'PagFinA_format_KO';
        }
        const ini = parseInt(document.getElementById('PagIniA').value || '0', 10);
        const fin = parseInt(document.getElementById('PagFinA').value || '0', 10);
        if (fin < ini) {
            this.dom.mostrar_error_campo('PagFinA', 'PagFinA_range_KO');
            return 'PagFinA_range_KO';
        }
        this.dom.mostrar_exito_campo('PagFinA');
        return true;
    }

    ADD_FechaPublicacionR_validation() {
        const valor = document.getElementById('FechaPublicacionR').value;
        if (!/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(valor)) {
            this.dom.mostrar_error_campo('FechaPublicacionR', 'FechaPublicacionR_format_KO');
            return 'FechaPublicacionR_format_KO';
        }
        const partes = valor.split('/');
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1;
        const anyo = parseInt(partes[2]);
        const fecha = new Date(anyo, mes, dia);
        if (fecha.getFullYear() !== anyo || fecha.getMonth() !== mes || fecha.getDate() !== dia) {
            this.dom.mostrar_error_campo('FechaPublicacionR', 'FechaPublicacionR_value_KO');
            return 'FechaPublicacionR_value_KO';
        }
        this.dom.mostrar_exito_campo('FechaPublicacionR');
        return true;
    }

    ADD_FicheropdfA_validation() {
        this.dom.mostrar_exito_campo('FicheropdfA');
        return true;
    }

    ADD_nuevo_FicheropdfA_validation() {
        if (!this.validations.not_exist_file('nuevo_FicheropdfA')) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_not_exist_file_KO');
            return 'nuevo_FicheropdfA_not_exist_file_KO';
        }
        if (!this.validations.type_file('nuevo_FicheropdfA', ['application/pdf'])) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_type_file_KO');
            return 'nuevo_FicheropdfA_type_file_KO';
        }
        if (!this.validations.max_size_file('nuevo_FicheropdfA', 5 * 1024 * 1024)) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_max_size_file_KO');
            return 'nuevo_FicheropdfA_max_size_file_KO';
        }
        if (!this.validations.format_name_file('nuevo_FicheropdfA', '^[A-Za-z0-9_.-]+$')) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_format_name_file_KO');
            return 'nuevo_FicheropdfA_format_name_file_KO';
        }
        this.dom.mostrar_exito_campo('nuevo_FicheropdfA');
        return true;
    }

    ADD_EstadoA_validation() {
        const valor = document.getElementById('EstadoA').value;
        const permitidos = ['Enviado', 'Revision', 'Publicado'];
        if (!permitidos.includes(valor)) {
            this.dom.mostrar_error_campo('EstadoA', 'EstadoA_value_KO');
            return 'EstadoA_value_KO';
        }
        this.dom.mostrar_exito_campo('EstadoA');
        return true;
    }

    EDIT_CodigoA_validation() {
        return this.ADD_CodigoA_validation();
    }

    EDIT_AutoresA_validation() {
        return this.ADD_AutoresA_validation();
    }

    EDIT_TituloA_validation() {
        return this.ADD_TituloA_validation();
    }

    EDIT_TituloR_validation() {
        return this.ADD_TituloR_validation();
    }

    EDIT_ISSN_validation() {
        return this.ADD_ISSN_validation();
    }

    EDIT_VolumenR_validation() {
        return this.ADD_VolumenR_validation();
    }

    EDIT_PagIniA_validation() {
        return this.ADD_PagIniA_validation();
    }

    EDIT_PagFinA_validation() {
        return this.ADD_PagFinA_validation();
    }

    EDIT_FechaPublicacionR_validation() {
        return this.ADD_FechaPublicacionR_validation();
    }

    EDIT_FicheropdfA_validation() {
        return true;
    }

    EDIT_nuevo_FicheropdfA_validation() {
        if (!this.validations.not_exist_file('nuevo_FicheropdfA')) {
            this.dom.mostrar_exito_campo('nuevo_FicheropdfA');
            return true;
        }
        if (!this.validations.type_file('nuevo_FicheropdfA', ['application/pdf'])) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_type_file_KO');
            return 'nuevo_FicheropdfA_type_file_KO';
        }
        if (!this.validations.max_size_file('nuevo_FicheropdfA', 5 * 1024 * 1024)) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_max_size_file_KO');
            return 'nuevo_FicheropdfA_max_size_file_KO';
        }
        if (!this.validations.format_name_file('nuevo_FicheropdfA', '^[A-Za-z0-9_.-]+$')) {
            this.dom.mostrar_error_campo('nuevo_FicheropdfA', 'nuevo_FicheropdfA_format_name_file_KO');
            return 'nuevo_FicheropdfA_format_name_file_KO';
        }
        this.dom.mostrar_exito_campo('nuevo_FicheropdfA');
        return true;
    }

    EDIT_EstadoA_validation() {
        return this.ADD_EstadoA_validation();
    }

    SEARCH_CodigoA_validation() {
        const valor = document.getElementById('CodigoA').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('CodigoA');
            return true;
        }
        if (!this.validations.format('CodigoA', '^[0-9]{0,11}$')) {
            this.dom.mostrar_error_campo('CodigoA', 'CodigoA_format_KO');
            return 'CodigoA_format_KO';
        }
        this.dom.mostrar_exito_campo('CodigoA');
        return true;
    }

    SEARCH_AutoresA_validation() {
        const valor = document.getElementById('AutoresA').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('AutoresA');
            return true;
        }
        if (!this.validations.format('AutoresA', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ,.]*$")) {
            this.dom.mostrar_error_campo('AutoresA', 'AutoresA_format_KO');
            return 'AutoresA_format_KO';
        }
        this.dom.mostrar_exito_campo('AutoresA');
        return true;
    }

    SEARCH_TituloA_validation() {
        const valor = document.getElementById('TituloA').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('TituloA');
            return true;
        }
        if (!this.validations.format('TituloA', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.\'-]*$")) {
            this.dom.mostrar_error_campo('TituloA', 'TituloA_format_KO');
            return 'TituloA_format_KO';
        }
        this.dom.mostrar_exito_campo('TituloA');
        return true;
    }

    SEARCH_TituloR_validation() {
        const valor = document.getElementById('TituloR').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('TituloR');
            return true;
        }
        if (!this.validations.format('TituloR', "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.\'-]*$")) {
            this.dom.mostrar_error_campo('TituloR', 'TituloR_format_KO');
            return 'TituloR_format_KO';
        }
        this.dom.mostrar_exito_campo('TituloR');
        return true;
    }

    SEARCH_ISSN_validation() {
        const valor = document.getElementById('ISSN').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('ISSN');
            return true;
        }
        if (!this.validations.format('ISSN', '^[0-9]{0,4}-?[0-9]{0,3}[0-9X]?$')) {
            this.dom.mostrar_error_campo('ISSN', 'ISSN_format_KO');
            return 'ISSN_format_KO';
        }
        this.dom.mostrar_exito_campo('ISSN');
        return true;
    }

    SEARCH_VolumenR_validation() {
        const valor = document.getElementById('VolumenR').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('VolumenR');
            return true;
        }
        if (!this.validations.format('VolumenR', '^[0-9]{0,4}$')) {
            this.dom.mostrar_error_campo('VolumenR', 'VolumenR_format_KO');
            return 'VolumenR_format_KO';
        }
        this.dom.mostrar_exito_campo('VolumenR');
        return true;
    }

    SEARCH_PagIniA_validation() {
        const valor = document.getElementById('PagIniA').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('PagIniA');
            return true;
        }
        if (!this.validations.format('PagIniA', '^[0-9]{0,4}$')) {
            this.dom.mostrar_error_campo('PagIniA', 'PagIniA_format_KO');
            return 'PagIniA_format_KO';
        }
        this.dom.mostrar_exito_campo('PagIniA');
        return true;
    }

    SEARCH_PagFinA_validation() {
        const valor = document.getElementById('PagFinA').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('PagFinA');
            return true;
        }
        if (!this.validations.format('PagFinA', '^[0-9]{0,4}$')) {
            this.dom.mostrar_error_campo('PagFinA', 'PagFinA_format_KO');
            return 'PagFinA_format_KO';
        }
        this.dom.mostrar_exito_campo('PagFinA');
        return true;
    }

    SEARCH_FechaPublicacionR_validation() {
        const valor = document.getElementById('FechaPublicacionR').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('FechaPublicacionR');
            return true;
        }
        if (!/^([0-9]{2})?(\/([0-9]{2})?(\/([0-9]{4})?)?)?$/.test(valor)) {
            this.dom.mostrar_error_campo('FechaPublicacionR', 'FechaPublicacionR_format_KO');
            return 'FechaPublicacionR_format_KO';
        }
        this.dom.mostrar_exito_campo('FechaPublicacionR');
        return true;
    }

    SEARCH_FicheropdfA_validation() {
        this.dom.mostrar_exito_campo('FicheropdfA');
        return true;
    }

    SEARCH_nuevo_FicheropdfA_validation() {
        return true;
    }

    SEARCH_EstadoA_validation() {
        const valor = document.getElementById('EstadoA').value;
        if (valor === '') {
            this.dom.mostrar_exito_campo('EstadoA');
            return true;
        }
        if (!['Enviado', 'Revision', 'Publicado'].includes(valor)) {
            this.dom.mostrar_error_campo('EstadoA', 'EstadoA_value_KO');
            return 'EstadoA_value_KO';
        }
        this.dom.mostrar_exito_campo('EstadoA');
        return true;
    }

    ADD_submit_articulo() {
        let result = (
            this.ADD_CodigoA_validation() &
            this.ADD_AutoresA_validation() &
            this.ADD_TituloA_validation() &
            this.ADD_TituloR_validation() &
            this.ADD_ISSN_validation() &
            this.ADD_VolumenR_validation() &
            this.ADD_PagIniA_validation() &
            this.ADD_PagFinA_validation() &
            this.ADD_FechaPublicacionR_validation() &
            this.ADD_nuevo_FicheropdfA_validation() &
            this.ADD_EstadoA_validation()
        );
        return Boolean(result);
    }

    EDIT_submit_articulo() {
        let result = (
            this.EDIT_AutoresA_validation() &
            this.EDIT_TituloA_validation() &
            this.EDIT_TituloR_validation() &
            this.EDIT_ISSN_validation() &
            this.EDIT_VolumenR_validation() &
            this.EDIT_PagIniA_validation() &
            this.EDIT_PagFinA_validation() &
            this.EDIT_FechaPublicacionR_validation() &
            this.EDIT_nuevo_FicheropdfA_validation() &
            this.EDIT_EstadoA_validation()
        );
        return Boolean(result);
    }

    SEARCH_submit_articulo() {
        let result = (
            this.SEARCH_CodigoA_validation() &
            this.SEARCH_AutoresA_validation() &
            this.SEARCH_TituloA_validation() &
            this.SEARCH_TituloR_validation() &
            this.SEARCH_ISSN_validation() &
            this.SEARCH_VolumenR_validation() &
            this.SEARCH_PagIniA_validation() &
            this.SEARCH_PagFinA_validation() &
            this.SEARCH_FechaPublicacionR_validation() &
            this.SEARCH_EstadoA_validation()
        );
        return Boolean(result);
    }
}
