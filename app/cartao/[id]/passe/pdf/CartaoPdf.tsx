import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Tamanho oficial cartão PVC CR80
const MM_TO_PT = 72 / 25.4;
const CARD_W = 85.6 * MM_TO_PT;
const CARD_H = 53.98 * MM_TO_PT;

type Props = {
  nome: string;
  numero: number;
  socioDesde?: string;
  qrBase64?: string;
  logoDataUrl?: string;
};

const styles = StyleSheet.create({
  page: {
    width: CARD_W,
    height: CARD_H,
    backgroundColor: "#ffffff",
    color: "#111111",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: "Helvetica",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1 solid #6f6f6f",
    borderRadius: 10,
    position: "relative",
  },

  securityText: {
    position: "absolute",
    bottom: 4,
    left: 12,
    right: 12,
    fontSize: 6,
    color: "#888888",
  },

  watermark: {
    position: "absolute",
    width: 180,
    height: 180,
    top: 18,
    left: 40,
    opacity: 0.04,
  },

  left: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    paddingRight: 10,
  },

  topBlock: {
    gap: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },

  clubeWrap: {
    flex: "1",
    marginLeft: 6,
  },

  clube: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#111111",
    letterSpacing: 1,
  },

  subtitulo: {
    fontSize: 8,
    color: "#666666",
    marginTop: 1,
  },

  nome: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#111111",
    marginTop: 10,
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 8,
    color: "#666666",
    marginBottom: 1,
  },

  infoValue: {
    fontSize: 8,
    fontWeight: "medium",
    color: "#111111",
    marginBottom: 6,
  },

  right: {
    width: 92,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  qrBox: {
    border: "1 solid #dddddd",
    borderRadius: 6,
    padding: 4,
    backgroundColor: "#ffffff",
  },

  qr: {
    width: 90,
    height: 90,
    borderRadius: 8,
  }
});

export default function CartaoPdf({
  nome,
  numero,
  socioDesde,
  qrBase64,
  logoDataUrl,
}: Props) {
  return (
    <Document>
      <Page
        size={{ width: CARD_W, height: CARD_H }}
        style={styles.page}
        wrap={false}
      >
        {logoDataUrl ? <Image src={logoDataUrl} style={styles.watermark} /> : null}

        <View style={styles.left}>
          <View style={styles.topBlock}>
            <View style={styles.headerRow}>
              {logoDataUrl ? <Image src={logoDataUrl} style={styles.logo} /> : null}

              <View style={styles.clubeWrap}>
                <Text style={styles.clube}>AD ÁGUIAS DA GRAÇA FC</Text>
                <Text style={styles.subtitulo}>Cartão de Sócio</Text>
              </View>
            </View>

            <Text style={styles.nome}>{nome}</Text>

            <View>
              <Text style={styles.infoLabel}>N.º de Sócio</Text>
              <Text style={styles.infoValue}>{numero}</Text>

              <Text style={styles.infoLabel}>Membro desde</Text>
              <Text style={styles.infoValue}>{socioDesde || "2025"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          {qrBase64 ? (
            <View style={styles.qrBox}>
              <Image src={qrBase64} style={styles.qr} />
            </View>
          ) : null}
        </View>

        <Text style={styles.securityText}>
          Cartão pessoal e intransmissível
        </Text>
      </Page>
    </Document>
  );
}