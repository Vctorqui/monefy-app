import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | Monefy",
  description: "Política de privacidad de Monefy - Cómo protegemos y manejamos tus datos financieros personales.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
          
          <p className="text-muted-foreground mb-6">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Información Personal</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nombre de usuario y dirección de correo electrónico</li>
                  <li>Información de cuentas bancarias y tarjetas de crédito</li>
                  <li>Transacciones financieras y datos de gastos</li>
                  <li>Información de categorías y presupuestos</li>
                </ul>
                
                <h3 className="text-xl font-medium">Información Técnica</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dirección IP y datos de navegación</li>
                  <li>Información del dispositivo y navegador</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Cómo Utilizamos tu Información</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios financieros</li>
                <li>Procesar transacciones y mantener registros financieros</li>
                <li>Enviar notificaciones importantes sobre tu cuenta</li>
                <li>Detectar y prevenir fraudes o actividades sospechosas</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Compartir Información</h2>
              <p className="mb-4">
                <strong>No vendemos ni compartimos tu información personal</strong> con terceros para fines comerciales. 
                Solo compartimos información en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Con tu consentimiento explícito</li>
                <li>Para cumplir con órdenes judiciales o requerimientos legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar la plataforma (bajo estrictos acuerdos de confidencialidad)</li>
                <li>En caso de fusión, adquisición o venta de activos (con notificación previa)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Seguridad de Datos</h2>
              <p className="mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cifrado de datos en tránsito y en reposo</li>
                <li>Autenticación de dos factores</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo continuo de seguridad</li>
                <li>Copias de seguridad regulares y seguras</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Tus Derechos</h2>
              <p className="mb-4">Tienes los siguientes derechos sobre tus datos personales:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acceso:</strong> Solicitar una copia de tus datos personales</li>
                <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
                <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Portabilidad:</strong> Obtener tus datos en formato estructurado</li>
                <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, contacta con nosotros en:{" "}
                <a href="mailto:victor.quinones.ch@gmail.com" className="text-primary hover:underline">
                  victor.quinones.ch@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Retención de Datos</h2>
              <p>
                Conservamos tu información personal durante el tiempo necesario para cumplir con los 
                propósitos descritos en esta política, cumplir con obligaciones legales, resolver 
                disputas y hacer cumplir nuestros acuerdos. Los datos financieros se conservan 
                según los requisitos regulatorios aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies y Tecnologías Similares</h2>
              <p className="mb-4">
                Utilizamos cookies y tecnologías similares para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener tu sesión activa</li>
                <li>Recordar tus preferencias</li>
                <li>Analizar el uso de la aplicación</li>
                <li>Mejorar la funcionalidad y experiencia del usuario</li>
              </ul>
              <p className="mt-4">
                Puedes controlar las cookies a través de la configuración de tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Transferencias Internacionales</h2>
              <p>
                Tus datos pueden ser transferidos y procesados en países fuera de tu jurisdicción. 
                Nos aseguramos de que dichas transferencias cumplan con las leyes de protección 
                de datos aplicables y que se implementen salvaguardas adecuadas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Menores de Edad</h2>
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos 
                intencionalmente información personal de menores. Si descubrimos que hemos 
                recopilado información de un menor, la eliminaremos inmediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                sobre cambios significativos por correo electrónico o mediante un aviso en 
                nuestra aplicación. Te recomendamos revisar esta política periódicamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos 
                tus datos personales, puedes contactarnos:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@monefy.app</p>
                <p><strong>Desarrollador:</strong> Victor</p>
                <p><strong>Proyecto:</strong> Monefy - Aplicación de Finanzas Personales</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
