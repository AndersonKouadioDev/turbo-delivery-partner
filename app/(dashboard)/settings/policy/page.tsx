import { ButtonBack } from "@/components/ui/navigation-ui/button-back";
import { title } from "@/components/primitives";
import { Divider } from "@heroui/react";

export default function Policy() {
  const edit_1 = <div>10 Novembre 2024</div>;
  return (
    <div className="w-full h-full gap-4 lg:gap-6">
      <ButtonBack
        className="bg-background"
        link="/settings"
        size="sm"
      />
      <div className="space-y-4 mt-4">
        <h1 className={title({ size: "h3", class: "text-primary" })}>
          Politique de confidentialité
        </h1>
        <Divider />
        {edit_1}
        <div className="space-y-2">
          <h2 className={title({ size: "h5", class: "dark:text-secondary" })}>
            Informations que nous collectons
          </h2>
          <p>
            Nous collectons des informations lorsque vous vous inscrivez sur
            notre site, passez une commande, ou interagissez avec nos services.
            Les informations collectées peuvent inclure :
          </p>
          <ul className="list-disc list-inside">
            <li>Votre nom</li>
            <li>Votre adresse e-mail</li>
            <li>Votre numéro de téléphone</li>
            <li>D&apos;autres informations pertinentes</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className={title({ size: "h5", class: "dark:text-secondary" })}>
            Utilisation de vos informations
          </h2>
          <p>Nous utilisons les informations que nous collectons pour :</p>
          <ul className="list-disc list-inside">
            <li>Fournir et gérer nos services</li>
            <li>Améliorer notre site et nos services</li>
            <li>Communiquer avec vous, y compris pour le service client</li>
            <li>Envoyer des mises à jour et des informations</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className={title({ size: "h5", class: "dark:text-secondary" })}>
            Protection de vos informations
          </h2>
          <p className="mt-2">
            Nous mettons en œuvre une variété de mesures de sécurité pour
            protéger vos informations personnelles. Vos données sont stockées
            dans des environnements sécurisés et accessibles uniquement à un
            nombre limité de personnes ayant des droits d&apos;accès spéciaux.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className={title({ size: "h5", class: "dark:text-secondary" })}>
            Vos droits
          </h2>
          <p className="mt-2">
            Vous avez le droit de demander l&apos;accès à vos informations
            personnelles, de demander leur correction ou leur suppression. Pour
            exercer ces droits, veuillez nous contacter.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className={title({ size: "h5", class: "dark:text-secondary" })}>
            Modifications de cette politique
          </h2>
          <p className="mt-2">
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps à autre. Nous vous informerons de tout changement en publiant
            la nouvelle politique sur cette page.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className={title({ size: "h5", class: "dark:text-secondary" })}>
            Contact
          </h2>
          <p>
            Si vous avez des questions concernant cette politique de
            confidentialité, veuillez nous contacter à{" "}
            <a href="mailto:votre-adresse-email@example.com">
              votre-adresse-email@example.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
