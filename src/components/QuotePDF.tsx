import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { URGENCY_SURCHARGE, EDITABLE_FILES_SURCHARGE } from '@/lib/constants';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  header: {
    marginBottom: 40,
    borderBottomWidth: 4,
    borderBottomColor: '#000000',
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'black',
    letterSpacing: -1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  accentTitle: {
    color: '#FE0048',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metaText: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#737373',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 15,
    color: '#FE0048',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  serviceName: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    flex: 1,
  },
  serviceCode: {
    fontSize: 9,
    color: '#A3A3A3',
    width: 80,
  },
  servicePrice: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'right',
    width: 80,
  },
  totalsSection: {
    marginTop: 20,
    padding: 24,
    backgroundColor: '#151717',
    color: '#FFFFFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#A3A3A3',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'black',
    textTransform: 'uppercase',
  },
  grandTotalValue: {
    fontSize: 24,
    fontWeight: 'black',
    color: '#FE0048',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 60,
    right: 60,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 8,
    color: '#737373',
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  legal: {
    marginTop: 20,
    fontSize: 8,
    color: '#A3A3A3',
    textAlign: 'center',
  }
});

interface QuotePDFProps {
  services: Array<{
    code: string;
    name: string;
    priceUsd: number;
  }>;
  total: number;
  paid: number;
  pending: number;
  clientName?: string;
  businessRules?: {
    urgency: boolean;
    editableFiles: boolean;
  };
}

export function QuotePDFDocument({
  services,
  total,
  paid,
  pending,
  clientName = 'Cliente Corriente',
  businessRules = { urgency: false, editableFiles: false },
}: QuotePDFProps) {
  const subtotal = services.reduce((acc, s) => acc + s.priceUsd, 0);

  return (
    <Document title={`Cotización MESTIZZO Studio - ${clientName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Propuesta <Text style={styles.accentTitle}>Creativa</Text>
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>MESTIZZO Studio / 2026</Text>
            <Text style={styles.metaText}>Fecha: {new Date().toLocaleDateString('es-CO')}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios Seleccionados</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Descripción</Text>
            <Text style={[styles.tableHeaderText, { width: 80 }]}>ID</Text>
            <Text style={[styles.tableHeaderText, { width: 80, textAlign: 'right' }]}>Monto</Text>
          </View>
          
          {services.map((service) => (
            <View key={service.code} style={styles.row}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceCode}>{service.code}</Text>
              <Text style={styles.servicePrice}>${service.priceUsd.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {(businessRules.urgency || businessRules.editableFiles) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inversiones Adicionales</Text>
            {businessRules.urgency && (
              <View style={styles.row}>
                <Text style={styles.serviceName}>Entrega Express (Urgencia 48h)</Text>
                <Text style={styles.servicePrice}>+{(subtotal * URGENCY_SURCHARGE).toFixed(2)}</Text>
              </View>
            )}
            {businessRules.editableFiles && (
              <View style={styles.row}>
                <Text style={styles.serviceName}>Licencia de Archivos Editables</Text>
                <Text style={styles.servicePrice}>+{(subtotal * EDITABLE_FILES_SURCHARGE).toFixed(2)}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)} USD</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Anticipo Pagado (50%)</Text>
            <Text style={styles.totalValue}>-${paid.toFixed(2)} USD</Text>
          </View>
          
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Saldo Pendiente</Text>
            <Text style={styles.grandTotalValue}>${pending.toFixed(2)} USD</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>• Vigencia de la cotización: 30 días calendario.</Text>
          <Text style={styles.footerText}>• Incluye dos (2) rondas de correcciones sobre la propuesta aprobada.</Text>
          <Text style={styles.footerText}>• El tiempo de entrega comienza a regir tras la confirmación del anticipo.</Text>
          <Text style={styles.footerText}>• Horas de soporte adicional: $35.00 USD/hora.</Text>
          
          <Text style={styles.legal}>
            MESTIZZO Studio © 2026 - Todos los derechos reservados.
            www.mestizzo.studio
          </Text>
        </View>
      </Page>
    </Document>
  );
}