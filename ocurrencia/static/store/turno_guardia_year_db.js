
Ext.define('etecsa.store.turno_guardia_year_db', {
    extend: 'Ext.data.Store',
    fields: ['year'],
    autoLoad: true,
    proxy : {
        url: '/ocurrencia/turno_guardia/year',
        type : 'ajax'
    }
});