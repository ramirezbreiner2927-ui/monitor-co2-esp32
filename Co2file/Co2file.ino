#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Iphone Luchito";
const char* password = "Luch1t0n3ym4r";
const char* serverSensor = "http://172.20.10.2:3000/sensor";
const char* serverLed    = "http://172.20.10.2:3000/led/estado";

#define PIN_MQ135 34
#define LED_AZUL 2

float Ro = 0.80;

void setup() {
  Serial.begin(115200);
  pinMode(LED_AZUL, OUTPUT);
  digitalWrite(LED_AZUL, HIGH); // HIGH = apagado (lógica invertida)

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\nConectado!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {

    // ── Enviar CO2 ──────────────────────────────────────
    int adc = analogRead(PIN_MQ135);
    float Rs = ((4095.0 / adc) - 1.0);
    float ratio = Rs / Ro;
    float co2 = 116.6020682 * pow(ratio, -2.769034857) * 200;
    if (co2 < 400) co2 = 400;

    HTTPClient http;
    http.begin(serverSensor);
    http.addHeader("Content-Type", "application/json");
    String json = "{\"co2\":" + String(co2) + "}";
    http.POST(json);
    http.end();

    Serial.print("CO2: "); Serial.println(co2);

    // ── Consultar estado del LED ─────────────────────────
    HTTPClient http2;
    http2.begin(serverLed);
    int code = http2.GET();

    if (code == 200) {
      String body = http2.getString();
      Serial.print("LED estado: "); Serial.println(body);

      if (body.indexOf("on") >= 0) {
        digitalWrite(LED_AZUL, LOW);  // LOW = enciende (lógica invertida)
      } else {
        digitalWrite(LED_AZUL, HIGH); // HIGH = apaga
      }
    }
    http2.end();
  }

  delay(2000);
}