import React from "react";
import { Helmet } from "react-helmet";
import { H2 } from "../elements/headings";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { Locales } from "../lib/localization";
import { useLocalization } from "../lib/use-localization";
import { dynamic } from "../lib/react-util";
import "./legal.scss";

export default function LegalPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Legal />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Legal(): JSX.Element {
	const l = useLocalization(locales);

	return (
		<Page className="Legal" header="small">
			<H2 id="publisher">{l.publisher}</H2>
			{l.publisherContent()}

			<H2 id="terms">{l.terms}</H2>
			{l.termsContent()}

			<H2 id="privacy">{l.privacy}</H2>
			{l.privacyContent()}
		</Page>
	);
}

const locales: Locales<{
	publisher: string;
	publisherContent: () => JSX.Element;

	terms: string;
	termsContent: () => JSX.Element;

	privacy: string;
	privacyContent: () => JSX.Element;
}> = {
	en: {
		publisher: "Publisher",
		publisherContent: () => (
			<>
				<p>
					Picapica is subject to research and development at the Web Technology &amp; Information Systems
					Group at Bauhaus-Universität Weimar.
				</p>
				<h4>Contact</h4>
				<p>
					Martin Potthast
					<br /> Bauhaus-Universität Weimar
					<br /> Fakultät Medien
					<br /> 99423 Weimar
					<br /> Germany
				</p>
				<p>
					Email: <a href="mailto:info@picapica.org">info@picapica.org</a>
					<br /> Phone: +49 3643 58 3756
					<br /> Fax: +49 3643 58 3709
				</p>
			</>
		),

		terms: "Terms of Service",
		termsContent: () => (
			<>
				<h4>Preface</h4>
				<p>
					These terms of service form a legal agreement between you and the publisher of this website: Chair
					of Web Technology and Information Systems at Bauhaus-Universität Weimar, 99423 Weimar, Germany
					("Webis").
				</p>
				<p>
					Subject matter of the contract are all services rendered on this website (the "services") and all
					data, information, and contents exchanged between the contractors (the "contents").
				</p>
				<p>
					Using the services is free of charge. Minors must ask permission from their parents before using the
					services.
				</p>
				<h4>Use of the services by You</h4>
				<p>
					You agree not to misuse the services in order to inflict damage on a third party, which particularly
					includes generating spam.
				</p>
				<p>You agree not to interrupt, damage, or disable the services.</p>
				<p>
					You agree to access the services only using the officially advertised interfaces (for instance via
					buttons, links, or forms displayed on this website, or via application programming interfaces
					offered). Should you uncover ways of accessing the services via other than the aforementioned
					interfaces, you agree to inform Webis about them while not disclosing them to a third party.
				</p>
				<p>
					Repeated automatic access to the application programming interfaces may not exceed the specified
					maximal access frequencies. Only the officially documented parameters and parameter values may be
					used.
				</p>
				<p>
					Certain parts of this website may be crawled automatically. These parts are specified using the
					robots exclusion protocol (http://www.picapica.org/robots.txt). If you crawl this website
					repeatedly, you agree to adjust your crawler to the frequency at which the static contents of this
					website change.
				</p>
				<p>
					You may use the services for private and commercial purposes, but agree not to sell the services to
					a third party, or indicate to a third party the services are yours.
				</p>
				<h4>Provision of the services by Webis</h4>
				<p>
					Should your use of the services violate the terms of service, Webis may deny you access to (parts
					of) the services at any time, without prior notice, without explanation.
				</p>
				<p>Webis is not required to offer the services free of charge.</p>
				<p>Webis may modify or deactivate the services without prior notice or explanation.</p>
				<h4>Use of the Contents by You</h4>
				<p>
					The services may show contents obtained from a third party. You agree to make sure that your use of
					contents obtained via the services complies with the copyrights of the respective copyright holders.
				</p>
				<h4>Provision of the Contents by Webis</h4>
				<p>
					Webis disclaims any copyrights of contents obtained from a third party which are exchanged via the
					services. Webis is not responsible for such contents and Webis does not adopt the messages conveyed
					with them as our own. Webis may filter the contents obtained from a third party before display.
				</p>
				<h4>Privacy Policy</h4>
				<p>
					While using the services, personal data about you may be gathered by Webis, or by a third party
					contractor. You agree to transfer usage rights of the gathered data to Webis and third party
					contractors of Webis without restrictions of time, location, or purpose of use of this data, if the
					use is directly or indirectly related to providing the services.
				</p>
				<p>
					You agree to the privacy policy which is in place at the time at which data is gathered:
					<br /> <a href="#privacy">http://www.picapica.org/legal/#privacy</a>
				</p>
				<h4>Exclusion of Warranties</h4>
				<p>
					YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK AND THAT THE
					SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." IN PARTICULAR, WEBIS, ITS SUBSIDIARIES AND
					AFFILIATES, AND ITS LICENSORS DO NOT REPRESENT OR WARRANT TO YOU THAT: (A) YOUR USE OF THE SERVICES
					WILL MEET YOUR REQUIREMENTS, (B) YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR
					FREE FROM ERROR, (C) ANY INFORMATION OBTAINED BY YOU AS A RESULT OF YOUR USE OF THE SERVICES WILL BE
					ACCURATE OR RELIABLE, AND (D) THAT DEFECTS IN THE OPERATION OR FUNCTIONALITY OF ANY SOFTWARE
					PROVIDED TO YOU AS PART OF THE SERVICES WILL BE CORRECTED. NO ADVICE OR INFORMATION, WHETHER ORAL OR
					WRITTEN, OBTAINED BY YOU FROM WEBIS OR THROUGH OR FROM THE SERVICES SHALL CREATE ANY WARRANTY NOT
					EXPRESSLY STATED IN THE TERMS. WEBIS FURTHER EXPRESSLY DISCLAIMS ALL WARRANTIES AND CONDITIONS OF
					ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES AND
					CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
				</p>
				<h4>Limitation of Liability</h4>
				<p>
					YOU EXPRESSLY UNDERSTAND AND AGREE THAT WEBIS, ITS SUBSIDIARIES AND AFFILIATES, AND ITS LICENSORS
					SHALL NOT BE LIABLE TO YOU FOR ANY LOSS OR DAMAGE WHICH MAY BE INCURRED BY YOU, INCLUDING BUT NOT
					LIMITED TO LOSS OR DAMAGE AS A RESULT OF: (A) ANY RELIANCE PLACED BY YOU ON THE COMPLETENESS,
					ACCURACY OR EXISTENCE OF ANY ADVERTISING, OR AS A RESULT OF ANY RELATIONSHIP OR TRANSACTION BETWEEN
					YOU AND ANY ADVERTISER OR SPONSOR WHOSE ADVERTISING APPEARS ON THE SERVICES; (B) ANY CHANGES WHICH
					WEBIS MAY MAKE TO THE SERVICES, OR FOR ANY PERMANENT OR TEMPORARY CESSATION IN THE PROVISION OF THE
					SERVICES (OR ANY FEATURES WITHIN THE SERVICES); (C) THE DELETION OF, CORRUPTION OF, OR FAILURE TO
					STORE, ANY CONTENT AND OTHER COMMUNICATIONS DATA MAINTAINED OR TRANSMITTED BY OR THROUGH YOUR USE OF
					THE SERVICES.
				</p>
				<p>
					YOU EXPRESSLY UNDERSTAND AND AGREE THAT WEBIS, ITS SUBSIDIARIES AND AFFILIATES, AND ITS LICENSORS
					SHALL NOT BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL CONSEQUENTIAL OR EXEMPLARY
					DAMAGES WHICH MAY BE INCURRED BY YOU, HOWEVER CAUSED AND UNDER ANY THEORY OF LIABILITY. THIS SHALL
					INCLUDE, BUT NOT BE LIMITED TO, ANY LOSS OF PROFIT (WHETHER INCURRED DIRECTLY OR INDIRECTLY), ANY
					LOSS OF GOODWILL OR BUSINESS REPUTATION, ANY LOSS OF DATA SUFFERED, COST OF PROCUREMENT OF
					SUBSTITUTE GOODS OR SERVICES, OR OTHER INTANGIBLE LOSS.
				</p>
				<h4>General Terms</h4>
				<p>Webis may change these terms of service at any time without prior notice or explanation.</p>
				<p>Webis may hire third party contractors to provide (parts of) the services.</p>
				<p>
					Webis provides translations of the German version of these terms of service into languages other
					than German. Only the German version of the terms of service is legally binding. In case of
					inconsistencies or conflicts between the German version of these terms of service and another
					version in a language other than German, the German version takes precedence.
				</p>
				<p>
					These terms of service are governed by German law. However, this applies only inasmuch laws in your
					jurisdiction do not foreclose the choice of applicable law.
				</p>
				<p>Court of jurisdiction and place of fulfillment is the location of Webis.</p>
			</>
		),

		privacy: "Privacy Policy",
		privacyContent: () => (
			<>
				<p>This website makes use of the following services:</p>
				<ul>
					<li>Picapica Search API</li>
				</ul>
				<p>In what follows you will find our privacy policies concerning each of these services.</p>
				<h4>Picapica Search API</h4>
				<p>
					Should you paste a text into the search box displayed on this website, enter a URL, or upload a
					document, your browser connects to the Picapica API in order to answer the search request. Picapica
					gathers and logs call data, such as the URLs accessed, the IP address of the caller, the browser
					used, its language settings as well as the date and time of access. A search request is only stored
					temporarily as long as the search is underway, and is eventually deleted afterwards. The search
					results are logged. The gathered data is used for purposes of research and development of Picapica
					and to analyze its usage. The data is processed manually and automatically and it is connected with
					other access data stored in the same access logs to gain insights into how this website is used. The
					data is not connected with other data about you. Parts of the data may be published in anonymized
					form as part of scientific publications. Otherwise, the data is not transferred to a third party and
					it is anonymized periodically (typically once a year). The anonymized data may be stored
					indefinitely. By making a search request you agree to this privacy policy. To prevent Picapica from
					gathering this data, do not make a search request. You may demand information about or deletion of
					the data stored about you. In such a case, please include the IP address from which you have
					accessed Picapica. In case your internet provider assigns dynamic IP addresses we also need the
					exact time frames at which you have accessed Picapica. Please direct your request at the publisher
					of this website.
				</p>
			</>
		),
	},
	de: {
		publisher: "Impressum",
		publisherContent: () => (
			<>
				<p>
					Picapica ist Gegenstand der Forschung am Lehrstuhl Web-Technology &amp; Information Systems an der
					Bauhaus-Universität Weimar.
				</p>
				<h4>Kontakt</h4>
				<p>
					Martin Potthast
					<br /> Bauhaus-Universität Weimar
					<br /> Fakultät Medien
					<br /> 99423 Weimar
				</p>
				<p>
					Email: <a href="mailto:info@picapica.org">info@picapica.org</a>
					<br /> Telefon: +49 3643 58 3756
					<br /> Telefax: +49 3643 58 3709
				</p>
			</>
		),

		terms: "Allgemeine Geschäftsbedingungen",
		termsContent: () => (
			<>
				<h4>Allgemeines</h4>
				<p>
					Die vorliegenden allgemeinen Geschäftsbedingungen regeln das Vertragsverhältnis zwischen Ihnen und
					dem Betreiber dieser Webseite: Lehrstuhl für Web-Technology &amp; Information Systems der
					Bauhaus-Universität Weimar, 99423 Weimar ("Webis").
				</p>
				<p>
					Vertragsgegenstand sind die auf dieser Webseite angebotenen Dienste (die "Dienste") und alle über
					die Dienste zwischen den Vertragspartnern ausgetauschten Inhalte (die "Inhalte").
				</p>
				<p>
					Die Nutzung der Dienste ist nicht kostenpflichtig. Minderjährige Nutzer müssen vor der ersten
					Nutzung der Dienste die Erlaubnis ihrer Erziehungsberechtigten einholen.
				</p>
				<h4>Nutzung der Dienste durch Sie</h4>
				<p>
					Sie sind nicht berechtigt, die Dienste in irgendeiner Art und Weise zu missbrauchen, um Dritten zu
					schaden; insbesondere nicht, um Spam zu erzeugen und zu versenden.
				</p>
				<p>
					Sie sind nicht berechtigt in die Dienste einzugreifen, um sie zu beschädigen, zu beeinträchtigen
					oder zu deaktivieren.
				</p>
				<p>
					Sie dürfen nur über die offiziell beworbenen Schnittstellen auf die Dienste zugreifen (z.B. mittels
					möglicherweise auf dieser Webseite vorhandenen Schaltflächen, Hyperlinks und Formularen sowie
					möglicherweise vorhandenen Application Programming Interfaces). Sollten Sie Wege entdecken, auf die
					Dienste über andere als die beworbenen Schnittstellen zuzugreifen, müssen Sie umgehend und unter
					Wahrung strikter Geheimhaltung Webis davon in Kenntnis setzen.
				</p>
				<p>
					Wiederholte automatisierte Zugriffe auf möglicherweise bereitgestellte Application Programming
					Interfaces dürfen die spezifizierten, maximalen Zugriffshäufigkeiten nicht überschreiten. Es dürfen
					dabei nur die offiziell beworbenen Parameter und Parametereinstellungen verwendet werden.
				</p>
				<p>
					Sie dürfen bestimmte Teile dieser Webseite automatisiert herunterladen (crawlen). Welche Teile
					dieser Webseite heruntergeladen werden dürfen und welche nicht ist mittels des
					Robots-Exclusion-Standard-Protokolls (http://www.picapica.org/robots.txt) spezifiziert. Bei
					wiederholtem herunterladen dieser Webseite müssen Sie die Zeit zwischen zwei Zugriffen der
					Änderungsrate der Inhalte dieser Webseite angleichen.
				</p>
				<p>
					Sie dürfen die Dienste für private und geschäftliche Zwecke nutzen, jedoch nicht an Dritte
					weiterverkaufen, oder Dritten gegenüber als die Ihren ausgeben.
				</p>
				<h4>Bereitstellung der Dienste durch Webis</h4>
				<p>
					Webis ist berechtigt, Ihnen den Zugang zu den Diensten ganz oder teilweise auf unbeschränkte Zeit
					ohne Vorwarnung oder Angabe von Gründen zu verwehren, falls Ihre Nutzung gegen Klauseln dieses
					Vertrags verstößt.
				</p>
				<p>Webis ist nicht dazu verpflichtet, die Dienste kostenlos zur Verfügung zu stellen.</p>
				<p>
					Webis darf die Dienste ohne Vorwarnung oder Angabe von Gründen verändern (zum Beispiel Funktionen
					hinzufügen oder entfernen) oder deaktivieren.
				</p>
				<h4>Nutzung der Inhalte durch Sie</h4>
				<p>
					Die Dienste beziehen Inhalte von Dritten und stellen diese in aufbereiteter Form dar. Es obliegt
					Ihnen, sicherzustellen, dass Ihre weitergehende Nutzung von Inhalten, die Sie über die Dienste
					bezogenen haben, in Übereinstimmung mit den Urheberrechten der jeweiligen Urheber ist.
				</p>
				<h4>Bereitstellung der Inhalte durch Webis</h4>
				<p>
					Webis erhebt keinen Anspruch auf die Urheberrechte an Inhalten Dritter, die über die Dienste
					bereitgestellt werden. Webis ist nicht verantwortlich für die Inhalte Dritter und macht sich diese
					nicht zu Eigen. Webis ist berechtigt die von Dritten bezogenen Inhalte im Zuge einer Aufbereitung zu
					filtern.
				</p>
				<h4>Datenschutz</h4>
				<p>
					Bei Ihrer Nutzung der Dienste werden durch Webis oder durch von Webis beauftragte Dritte nutzungs-
					oder personenbezogene Daten erhoben. Sie übertragen einfache, veräußerliche Nutzungsrechte über die
					erhobenen Daten räumlich, zeitlich und inhaltlich unbeschränkt an Webis und die jeweils von Webis
					beauftragten Dritten ausschließlich zum Zweck der Diensterbringung.
				</p>
				<p>
					Die Datenerhebung unterliegt der zum Zeitpunkt Ihrer Nutzung geltenden Datenschutzerklärung:
					<br />
					<a href="#privacy">http://www.picapica.org/legal/#privacy</a>
				</p>
				<h4>Gewährleistungsausschluss</h4>
				<p>
					Die Bereitstellung der Dienste erfolgt grundsätzlich ohne Gewähr ihrer Verfügbarkeit oder
					Verwendbarkeit für die von Ihnen verfolgten Zwecke. Die Bereitstellung der Inhalte erfolgt ohne
					Gewähr ihrer Vollständigkeit oder Richtigkeit.
				</p>
				<h4>Haftungsbeschränkung</h4>
				<p>
					Ansprüche auf Schadenersatz eines Vertragspartners gegen den jeweils anderen auf Grundlage einfacher
					Fahrlässigkeit bestehen nur bei Verletzung einer Kardinalpflicht. In solchen Fällen ist die Höhe der
					Haftung begrenzt auf die typischen zum Zeitpunkt der Nutzung des Dienstes vorhersehbaren Schäden.
					Übrige Ansprüche auf Schadenersatz auf Grundlage von Vorsatz, grober Fahrlässigkeit oder im Rahmen
					der Produkthaftung bleiben hiervon unberührt.
				</p>
				<p>
					Sie befreien Webis von jeglichen Ansprüchen Dritter gegen Webis, sofern diese Ansprüche sich auf
					einer Verletzung der Rechte besagter Dritter beruhen und ursächlich durch Ihre Nutzung der Dienste
					oder von über die Dienste bezogenen Inhalten entstanden sind.
				</p>
				<h4>Schlussbestimmungen</h4>
				<p>
					Webis darf diese allgemeinen Geschäftsbedingungen jederzeit ohne Ankündigung oder Angabe von Gründen
					ändern.
				</p>
				<p>Webis darf Dritte mit der Erbringung der Dienste beauftragen.</p>
				<p>
					Webis bietet als Hilfestellung Übersetzungen der deutschsprachigen Version dieser allgemeinen
					Geschäftsbedingungen in andere Sprachen an. Rechtlich bindend ist ausschließlich die deutsche
					Version dieser allgemeinen Geschäftsbedingungen. Bei etwaigen Widersprüchen zwischen der
					deutschsprachigen Version dieser allgemeinen Geschäftsbedingungen und einer ihrer Übersetzungen
					haben die Bestimmungen der deutschsprachigen Version vorrang.
				</p>
				<p>
					Diese allgemeinen Geschäftsbedingungen unterliegen ausschließlich dem Recht der Bundesrepublik
					Deutschland. Dies gilt jedoch nur insofern die Gesetze eines Staates, in dem Sie Ihren gewöhnlichen
					Aufenthalt haben, eine solche Rechtswahl nicht unterbinden.
				</p>
				<p>Gerichtsstand und Erfüllungsort ist der Sitz von Webis.</p>
			</>
		),

		privacy: "Privacy Policy",
		privacyContent: () => (
			<>
				<p>Diese Webseite verwendet die folgenden Dienste:</p>
				<ul>
					<li>Picapica Search API</li>
				</ul>
				<p>Nachfolgend finden Sie eine Datenschutzerklärung für jeden dieser Dienste.</p>
				<h4>Picapica Search API</h4>
				<p>
					Sofern Sie im dafür vorgesehen Textfeld dieser Webseite eine Anfrage oder eine URL eingeben bzw. ein
					Dokument hochladen wird eine Verbindung zu einem Server Picapicas aufgebaut, der Ihre Anfrage
					entgegen nimmt und beantwortet. Es werden dabei folgende Daten erhoben und protokolliert: Datum und
					Zeit der Verbindungsherstellung, IP-Adresse des anfragenden Rechners, Browsertyp und Browsersprache.
					Die Anfrage selbst wird nur temporär, während der Suche gespeichert und gelegentlich wieder
					gelöscht. Die Suchergebnisse werden protokolliert. Die erhobenen Daten dienen dem Zweck der
					wissenschaftlichen Erforschung, Evaluierung und Weiterentwicklung von Picapica und der statistischen
					Auswertung des Zugriffs auf diese Webseite. Die Daten werden manuell und automatisiert
					weiterverarbeitet und mit den im gleichen Protokoll gespeicherten Daten anderer Nutzer verglichen,
					um Einblicke in die Art und Weise, wie diese Webseite genutzt wird, zu gewinnen. Die Daten werden
					nicht mit anderen personenbezogenen Daten verknüpft. Auszüge der Daten können in anonymisierter Form
					Teil wissenschaftlicher Veröffentlichungen werden. Die Daten werden ansonsten nicht an Dritte
					übertragen und in regelmäßigen Abständen (überlicherweise jährlich) anonymisiert. Anschließend
					werden die Daten auf unbestimmte Zeit für spätere Auswertungen archiviert. Das Abschicken einer
					Suchanfrage wird als Einwilligung in die Datenerhebung aufgefasst. Um die Datenerhebung zu
					verhindern, machen schicken Sie keine Sucheanfrage ab. Sie können jederzeit Auskunft über bzw.
					Löschung der über Sie gespeicherten Daten verlangen. Um einem solchen Gesuch zu entsprechen,
					benötigen wir Ihre IP-Adresse und, falls Ihr Internetanbieter Ihre IP-Adresse dynamisch vergibt, die
					Zeitpunkte zu denen Sie unter Verwendung dieser IP-Adresse Anfragen an Picapica gerichtet haben.
					Bitte richten Sie ihr Gesuch an die im Impressum dieser Seite genannte Adresse.
				</p>
			</>
		),
	},
};
