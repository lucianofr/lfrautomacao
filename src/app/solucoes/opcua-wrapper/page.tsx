import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cable, Server, Settings, RefreshCw } from 'lucide-react';
import styles from '../solucao.module.css';

export default function OpcUAWrapperPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              OpcUA <span className="text-gradient-amber">Wrapper</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Ponte de modernização industrial: encapsule servidores OPC DA locais e exponha seus dados em endpoints modernos OPC-UA de forma simples e robusta.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Um aplicativo de configuração e um serviço de background que resolvem a barreira de conectividade entre o legado OPC DA e as arquiteturas IIoT baseadas em OPC-UA.
              </blockquote>

              <img 
                src="/images/opcua-wrapper.png" 
                alt="Interface do Configurador OPC-DA para OPC-UA" 
                className={styles.screenshot} 
              />

              <h2>O Problema de Conectividade</h2>
              <p>
                Muitas plantas industriais ainda operam com CLPs e sistemas SCADA legados que oferecem dados exclusivamente via OPC DA (Data Access), um protocolo antigo e fortemente acoplado ao ecossistema Windows (DCOM), o que inviabiliza a integração segura com a nuvem, arquiteturas de Edge Computing e sistemas de Inteligência Artificial modernos.
              </p>

              <h2>O Aplicativo Configurador (Configurator)</h2>
              <p>
                O sistema é composto por uma interface de usuário de janela simples e direta, onde você prepara o ambiente:
              </p>
              <ul>
                <li><strong>Descoberta Local:</strong> O aplicativo lista automaticamente os servidores OPC DA disponíveis na máquina local.</li>
                <li><strong>Navegação de Tags:</strong> O usuário conecta ao servidor legado e navega pela árvore de tags (browse) com estrutura visual, exatamente como em um client OPC padrão.</li>
                <li><strong>Seleção Intuitiva:</strong> Basta selecionar (checkbox) as tags que deseja publicar e expor para a rede moderna via OPC-UA.</li>
                <li><strong>Geração de Configuração:</strong> O aplicativo salva as preferências do usuário, criando a base que será utilizada pelo serviço que roda em background.</li>
              </ul>

              <h2>Serviço Windows (Background Worker)</h2>
              <p>
                Após salvar a configuração através do configurador, a aplicação principal entra em ação operando como um Serviço do Windows (transparente e autônomo):
              </p>
              <ul>
                <li><strong>Loop Contínuo:</strong> O serviço fica continuamente lendo os dados do servidor OPC DA local e atualizando as tags em tempo real na interface OPC-UA.</li>
                <li><strong>Endpoint OPC-UA Nativo:</strong> Levanta um servidor OPC-UA seguro e moderno publicando todas as tags selecionadas.</li>
                <li><strong>Leitura e Escrita Bidirecional:</strong> Permite não apenas monitorar e ler os valores via OPC-UA, mas enviar comandos de escrita (write) de volta para o sistema legado.</li>
                <li><strong>Auto Reconexão:</strong> Em caso de instabilidade, queda de energia ou reinicialização do servidor OPC DA local, o serviço detecta a falha e tenta a reconexão automática contínua sem necessidade de intervenção humana.</li>
              </ul>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h4>Download do Instalador</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                  Baixe a versão mais recente do Configurador e do Serviço Windows.
                </p>
                <a href="/files/OpcUaWrapperSetup-1.0.0.exe" download className="btn-primary" style={{ display: 'block', width: '100%', padding: '0.8rem', textAlign: 'center' }}>
                  Baixar OpcUA Wrapper v1.0.0
                </a>
              </div>

              <div className={styles.techBox}>
                <h4>Características Técnicas</h4>
                <ul className={styles.techList}>
                  <li><Cable size={18} /> Protocolo OPC DA & UA</li>
                  <li><Settings size={18} /> Windows UI App</li>
                  <li><Server size={18} /> Windows Background Service</li>
                  <li><RefreshCw size={18} /> Auto Reconnect Local</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
