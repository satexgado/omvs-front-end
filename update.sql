SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Listage de la structure de table vision. trans_affectation_itineraire_auto
CREATE TABLE IF NOT EXISTS `trans_affectation_itineraire_auto` (
  `id_affectation_itineraire_bus` int(11) NOT NULL AUTO_INCREMENT,
  `bus` int(11) DEFAULT NULL,
  `itineraire` int(11) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `commentaire` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_affectation_itineraire_bus`),
  KEY `affectation_bus_itineraire` (`itineraire`),
  KEY `affectation_itineraire_bus` (`bus`),
  KEY `affectation_itineraire_bus_ins` (`inscription`),
  CONSTRAINT `affectation_bus_itineraire` FOREIGN KEY (`itineraire`) REFERENCES `trans_itineraire` (`id_itineraire`),
  CONSTRAINT `affectation_itineraire_bus` FOREIGN KEY (`bus`) REFERENCES `trans_auto` (`id_bus`),
  CONSTRAINT `affectation_itineraire_bus_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_affectation_permis_chauffeur
CREATE TABLE IF NOT EXISTS `trans_affectation_permis_chauffeur` (
  `id_affectation_permis_chauffeur` int(11) NOT NULL AUTO_INCREMENT,
  `type_permis` int(11) DEFAULT NULL,
  `numero_permis` varchar(30) DEFAULT NULL,
  `chauffeur` int(11) DEFAULT NULL,
  `date_obtention` varchar(20) DEFAULT NULL,
  `pays_obtention` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_affectation_permis_chauffeur`),
  KEY `affectation_permis_chauffeur` (`chauffeur`),
  KEY `affectation_permis` (`type_permis`),
  KEY `affectation_permis_inscrip` (`inscription`),
  KEY `affectation_permis_pays` (`pays_obtention`),
  CONSTRAINT `affectation_permis` FOREIGN KEY (`type_permis`) REFERENCES `trans_type_permis` (`id_type_permis`),
  CONSTRAINT `affectation_permis_chauffeur` FOREIGN KEY (`chauffeur`) REFERENCES `personnel` (`id`),
  CONSTRAINT `affectation_permis_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `affectation_permis_pays` FOREIGN KEY (`pays_obtention`) REFERENCES `pays` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_affectation_permis_dossier
CREATE TABLE IF NOT EXISTS `trans_affectation_permis_dossier` (
  `id_type_bus` int(11) NOT NULL AUTO_INCREMENT,
  `permis` int(11) DEFAULT NULL,
  `dossier` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_bus`),
  KEY `affectation_dossier_typepermis` (`dossier`),
  KEY `affectation_typepermis_dossier` (`permis`),
  KEY `affectation_typepermis_dossier_ins` (`inscription`),
  CONSTRAINT `affectation_dossier_typepermis` FOREIGN KEY (`dossier`) REFERENCES `trans_dossieur_conducteur` (`id_dossieur_conducteur`),
  CONSTRAINT `affectation_typepermis_dossier` FOREIGN KEY (`permis`) REFERENCES `trans_type_permis` (`id_type_permis`),
  CONSTRAINT `affectation_typepermis_dossier_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_affectation_zone_auto
CREATE TABLE IF NOT EXISTS `trans_affectation_zone_auto` (
  `id_affectation_zone_bus` int(11) NOT NULL AUTO_INCREMENT,
  `bus` int(11) DEFAULT NULL,
  `zone` int(11) DEFAULT NULL,
  `date_debut` timestamp NULL DEFAULT NULL,
  `commentaire` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_fin` time DEFAULT NULL,
  PRIMARY KEY (`id_affectation_zone_bus`),
  KEY `affectation_bus_zone` (`zone`),
  KEY `affectation_zone_bus` (`bus`),
  KEY `affectation_zone_bus_ins` (`inscription`),
  CONSTRAINT `affectation_bus_zone` FOREIGN KEY (`zone`) REFERENCES `trans_itineraire` (`id_itineraire`),
  CONSTRAINT `affectation_zone_bus` FOREIGN KEY (`bus`) REFERENCES `trans_auto` (`id_bus`),
  CONSTRAINT `affectation_zone_bus_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_auto
CREATE TABLE IF NOT EXISTS `trans_auto` (
  `id_bus` int(11) NOT NULL AUTO_INCREMENT,
  `type_acquisition` varchar(20) DEFAULT NULL COMMENT 'Achat, Location',
  `designation` varchar(80) DEFAULT NULL,
  `immatriculation` varchar(20) DEFAULT NULL,
  `numero_chassis` int(11) DEFAULT NULL,
  `serie` int(11) DEFAULT NULL,
  `marque` int(11) DEFAULT NULL,
  `modele` int(11) DEFAULT NULL,
  `genre` int(11) DEFAULT NULL,
  `etat_achat` varchar(20) DEFAULT NULL COMMENT 'Neuf; déjà Utilisé',
  `date_achat` timestamp NULL DEFAULT NULL,
  `montant` int(11) DEFAULT NULL,
  `type_carburant` int(11) DEFAULT NULL,
  `type_automobile` int(11) DEFAULT NULL,
  `nombre_place` int(11) DEFAULT NULL,
  `nombre_porte` int(11) DEFAULT NULL,
  `couleur` int(11) DEFAULT NULL,
  `kilometrage_durant_achat` int(11) DEFAULT NULL,
  `type_transmission` varchar(20) DEFAULT NULL COMMENT 'automatique, manuelle',
  `emission_co2` varchar(20) DEFAULT NULL,
  `nombre_chevaux` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_bus`),
  KEY `auto_serie` (`serie`),
  KEY `auto_marque` (`marque`),
  KEY `auto_modele` (`modele`),
  KEY `auto_genre` (`genre`),
  KEY `auto_type_carburant` (`type_carburant`),
  KEY `auto_type_automobile` (`type_automobile`),
  KEY `auto_couleur` (`couleur`),
  KEY `auto_inscription` (`inscription`),
  CONSTRAINT `auto_couleur` FOREIGN KEY (`couleur`) REFERENCES `trans_couleur` (`id_couleur`),
  CONSTRAINT `auto_genre` FOREIGN KEY (`genre`) REFERENCES `trans_genre` (`id_genre`),
  CONSTRAINT `auto_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `auto_marque` FOREIGN KEY (`marque`) REFERENCES `trans_marque` (`id_marque`),
  CONSTRAINT `auto_modele` FOREIGN KEY (`modele`) REFERENCES `trans_modele` (`id_modele`),
  CONSTRAINT `auto_serie` FOREIGN KEY (`serie`) REFERENCES `trans_serie` (`id_serie`),
  CONSTRAINT `auto_type_automobile` FOREIGN KEY (`type_automobile`) REFERENCES `trans_type_automobile` (`id_type_automobile`),
  CONSTRAINT `auto_type_carburant` FOREIGN KEY (`type_carburant`) REFERENCES `trans_type_carburant` (`id_type_carburant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_condition_participation
CREATE TABLE IF NOT EXISTS `trans_condition_participation` (
  `id_condition_participation` int(11) NOT NULL AUTO_INCREMENT,
  `condition_participation` text,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_condition_participation`),
  KEY `condition_participation_ins` (`inscription`),
  CONSTRAINT `condition_participation_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_couleur
CREATE TABLE IF NOT EXISTS `trans_couleur` (
  `id_couleur` int(11) NOT NULL AUTO_INCREMENT,
  `couleur` varchar(300) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_couleur`),
  KEY `couleur_ins` (`inscription`),
  CONSTRAINT `couleur_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_document_permis
CREATE TABLE IF NOT EXISTS `trans_document_permis` (
  `id_document_permis` int(11) NOT NULL AUTO_INCREMENT,
  `proprietaire` int(11) DEFAULT NULL,
  `type_permis` int(11) DEFAULT NULL,
  `titre_document` varchar(20) DEFAULT NULL,
  `date_obtention` date DEFAULT NULL,
  `remarque` varchar(200) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_document_permis`),
  KEY `document_permis_ins` (`inscription`),
  KEY `document_permis_type` (`type_permis`),
  CONSTRAINT `document_permis_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `document_permis_type` FOREIGN KEY (`type_permis`) REFERENCES `trans_type_permis` (`id_type_permis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_dossier_medical
CREATE TABLE IF NOT EXISTS `trans_dossier_medical` (
  `id_dossier_medical` int(11) NOT NULL AUTO_INCREMENT,
  `proprietaire` int(11) DEFAULT NULL,
  `type_dossier` int(11) DEFAULT NULL,
  `titre_document` varchar(20) DEFAULT NULL,
  `date_obtention` date DEFAULT NULL,
  `remarque` varchar(200) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_dossier_medical`),
  KEY `document_med_ins` (`inscription`),
  KEY `document_medi_type` (`type_dossier`),
  CONSTRAINT `document_med_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `document_medi_type` FOREIGN KEY (`type_dossier`) REFERENCES `trans_type_dossier_medical` (`id_type_dossier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_dossieur_conducteur
CREATE TABLE IF NOT EXISTS `trans_dossieur_conducteur` (
  `id_dossieur_conducteur` int(11) NOT NULL AUTO_INCREMENT,
  `conducteur` int(11) DEFAULT NULL,
  `lieu_obtention_permis` int(11) DEFAULT NULL COMMENT 'pays',
  `numero_permis` varchar(30) DEFAULT NULL,
  `date_obtention` timestamp NULL DEFAULT NULL,
  `etes_vous_fumeur` varchar(100) DEFAULT NULL COMMENT 'Oui, Non, Oui, j''''ai arrêté, je prends un peu,je prends rarement',
  `depuis_quand_avez_vous_arrete` varchar(100) DEFAULT NULL,
  `prenez_vous_lalcool` varchar(100) DEFAULT NULL COMMENT 'Oui, Non, Oui, j''''ai arrêté, je prends un peu,je prends rarement',
  `depuis_quand_vous_avez_arrete` varchar(100) DEFAULT NULL,
  `avez_vous_des_difficultes_entrendre` varchar(20) DEFAULT NULL COMMENT 'oui,non',
  `quel_difficultes` varchar(200) DEFAULT NULL,
  `combien_doreille` varchar(7) DEFAULT NULL COMMENT 'Un, Deux',
  `laquelle` varchar(200) DEFAULT NULL,
  `avez_vous_des_difficultes_voir` varchar(20) DEFAULT NULL COMMENT 'oui,non, jamais',
  `utilisez_vous_des_correcteurs` varchar(20) DEFAULT NULL COMMENT 'oui, non',
  `avez_vous_consulte_un_specialiste` varchar(20) DEFAULT NULL COMMENT 'oui,non',
  `a_quand_remonte_votre_consultation` varchar(20) DEFAULT NULL COMMENT '3 mois, 6 mois, Un an, Deux ans, Plus..',
  `depuis_combien_de_temps_conduisez_vous_annee` varchar(20) DEFAULT NULL COMMENT 'De 1 jusqu''à 50',
  `avez_vous_exercez_autre_part` varchar(20) DEFAULT NULL COMMENT 'oui, non',
  `reference` varchar(200) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_dossieur_conducteur`),
  KEY `dossieur_conducteur` (`conducteur`),
  KEY `dossieur_conducteur_ins` (`inscription`),
  KEY `dossieur_conducteur_lieu` (`lieu_obtention_permis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_genre
CREATE TABLE IF NOT EXISTS `trans_genre` (
  `id_genre` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(20) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_genre`),
  KEY `genre_ins` (`inscription`),
  CONSTRAINT `genre_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_itineraire
CREATE TABLE IF NOT EXISTS `trans_itineraire` (
  `id_itineraire` int(11) NOT NULL AUTO_INCREMENT,
  `masque` int(11) DEFAULT NULL,
  `libelle_itineraire` varchar(200) DEFAULT NULL,
  `point_depart` int(11) DEFAULT NULL,
  `heure_depart` varchar(10) DEFAULT NULL,
  `duree_estimee` time DEFAULT NULL,
  `heure_arrive` varchar(10) DEFAULT NULL,
  `lieu_arrivee` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_itineraire`),
  KEY `itineraire_masque` (`masque`),
  KEY `itineraire_lieu_depart` (`point_depart`),
  KEY `itineraire_lieu_arrivee` (`lieu_arrivee`),
  KEY `itineraire_inscription` (`inscription`),
  CONSTRAINT `itineraire_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `itineraire_lieu_arrivee` FOREIGN KEY (`lieu_arrivee`) REFERENCES `trans_lieu` (`id_lieu`),
  CONSTRAINT `itineraire_lieu_depart` FOREIGN KEY (`point_depart`) REFERENCES `trans_lieu` (`id_lieu`),
  CONSTRAINT `itineraire_masque` FOREIGN KEY (`masque`) REFERENCES `trans_masque_itineraire` (`id_masque_itineraire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_lieu
CREATE TABLE IF NOT EXISTS `trans_lieu` (
  `id_lieu` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `lieu` varchar(100) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id_lieu`),
  KEY `lieu_inscription` (`inscription`),
  CONSTRAINT `lieu_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_lieu_position_itineraire
CREATE TABLE IF NOT EXISTS `trans_lieu_position_itineraire` (
  `id_lieu_position` int(11) NOT NULL AUTO_INCREMENT,
  `itineraire` int(11) DEFAULT NULL,
  `lieu` int(11) DEFAULT NULL,
  `point_arret` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_lieu_position`),
  KEY `lieu_position_itineraire` (`itineraire`),
  KEY `position_itineraire_lieu` (`position`),
  KEY `itineraire_point_arret` (`point_arret`),
  KEY `lieu_position_inscrip` (`inscription`),
  CONSTRAINT `itineraire_point_arret` FOREIGN KEY (`point_arret`) REFERENCES `trans_point_arret` (`id_point_arret`),
  CONSTRAINT `lieu_position_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `lieu_position_itineraire` FOREIGN KEY (`itineraire`) REFERENCES `trans_itineraire` (`id_itineraire`),
  CONSTRAINT `position_itineraire_lieu` FOREIGN KEY (`position`) REFERENCES `trans_position` (`id_position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_marque
CREATE TABLE IF NOT EXISTS `trans_marque` (
  `id_marque` int(11) NOT NULL AUTO_INCREMENT,
  `marque` varchar(20) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_marque`),
  KEY `marque_ins` (`inscription`),
  CONSTRAINT `marque_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

-- Listage de la structure de table vision. trans_masque_itineraire
CREATE TABLE IF NOT EXISTS `trans_masque_itineraire` (
  `id_masque_itineraire` int(11) NOT NULL AUTO_INCREMENT,
  `periode_itineraire` varchar(20) DEFAULT NULL COMMENT 'Matin, Midi, Soir',
  `ville` int(11) DEFAULT NULL,
  `direction` varchar(20) DEFAULT NULL COMMENT 'Depart, Retour, Intermédiaire',
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_masque_itineraire`),
  KEY `masque_itineraire_inscrip` (`inscription`),
  KEY `masque_itineraire_ville` (`ville`),
  CONSTRAINT `masque_itineraire_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `masque_itineraire_ville` FOREIGN KEY (`ville`) REFERENCES `ville` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_modele
CREATE TABLE IF NOT EXISTS `trans_modele` (
  `id_modele` int(11) NOT NULL AUTO_INCREMENT,
  `modele` varchar(20) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_modele`),
  KEY `modele_ins` (`inscription`),
  CONSTRAINT `modele_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_point_arret
CREATE TABLE IF NOT EXISTS `trans_point_arret` (
  `id_point_arret` int(11) NOT NULL AUTO_INCREMENT,
  `ville` int(11) DEFAULT NULL,
  `lieu` int(11) DEFAULT NULL,
  `point_arret` varchar(100) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` varchar(20) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_point_arret`),
  KEY `point_arret_lieu` (`lieu`),
  KEY `point_arret_ville` (`ville`),
  KEY `point_arret_inscrip` (`inscription`),
  CONSTRAINT `point_arret_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `point_arret_lieu` FOREIGN KEY (`lieu`) REFERENCES `trans_lieu` (`id_lieu`),
  CONSTRAINT `point_arret_ville` FOREIGN KEY (`ville`) REFERENCES `ville` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_point_arrets
CREATE TABLE IF NOT EXISTS `trans_point_arrets` (
  `id_point_arret` int(11) NOT NULL AUTO_INCREMENT,
  `itineraire` int(11) DEFAULT NULL,
  `lieu` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_point_arret`),
  KEY `point_arret_inscription` (`inscription`),
  KEY `point_arret_lieux` (`lieu`),
  KEY `point_arret_vil` (`itineraire`),
  CONSTRAINT `point_arret_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  CONSTRAINT `point_arret_lieux` FOREIGN KEY (`lieu`) REFERENCES `trans_lieu` (`id_lieu`),
  CONSTRAINT `poit_arret_itineraire` FOREIGN KEY (`itineraire`) REFERENCES `trans_itineraire` (`id_itineraire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_position
CREATE TABLE IF NOT EXISTS `trans_position` (
  `id_position` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(1) DEFAULT NULL,
  `description` varchar(20) DEFAULT NULL COMMENT 'Position 1, Position 2, Position 3',
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_position`),
  KEY `position_ins` (`inscription`),
  CONSTRAINT `position_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_serie
CREATE TABLE IF NOT EXISTS `trans_serie` (
  `id_serie` int(11) NOT NULL AUTO_INCREMENT,
  `serie` varchar(20) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_serie`),
  KEY `serie_ins` (`inscription`),
  CONSTRAINT `serie_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_type_automobile
CREATE TABLE IF NOT EXISTS `trans_type_automobile` (
  `id_type_automobile` int(11) NOT NULL AUTO_INCREMENT,
  `type_automobile` varchar(20) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_automobile`),
  KEY `type_automobile_ins` (`inscription`),
  CONSTRAINT `type_automobile_ins` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_type_carburant
CREATE TABLE IF NOT EXISTS `trans_type_carburant` (
  `id_type_carburant` int(11) NOT NULL AUTO_INCREMENT,
  `type_carburant` varchar(100) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_carburant`),
  CONSTRAINT `inscription_type_carburant` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_type_dossier_medical
CREATE TABLE IF NOT EXISTS `trans_type_dossier_medical` (
  `id_type_dossier` int(11) NOT NULL AUTO_INCREMENT,
  `type_dossier` varchar(100) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_dossier`),
  CONSTRAINT `type_dos_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de table vision. trans_type_permis
CREATE TABLE IF NOT EXISTS `trans_type_permis` (
  `id_type_permis` int(11) NOT NULL AUTO_INCREMENT,
  `type_permis` varchar(100) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_permis`),
  CONSTRAINT `type_permis_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_acquisition_materiel`
--

DROP TABLE IF EXISTS `visi_acquisition_materiel`;
CREATE TABLE IF NOT EXISTS `visi_acquisition_materiel` (
  `id_acquis_materiel` int(11) NOT NULL AUTO_INCREMENT,
  `id_livraison` int(11) DEFAULT NULL,
  `origine_materiel` varchar(20) DEFAULT NULL COMMENT 'Location, Achat, Don',
  `date_acquisition` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_acquis_materiel`),
  KEY `acquis_materiel_inscription` (`inscription`),
  KEY `materiel_livraison` (`id_livraison`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_affectation_amortissement_materiel_duree`
--

DROP TABLE IF EXISTS `visi_affectation_amortissement_materiel_duree`;
CREATE TABLE IF NOT EXISTS `visi_affectation_amortissement_materiel_duree` (
  `id_aff_commande_personne` int(11) NOT NULL AUTO_INCREMENT,
  `amortissement` int(11) DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `duree_avant_remplacement` int(11) DEFAULT NULL,
  `alerte` int(11) DEFAULT NULL,
  `valeur_prevu` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_aff_commande_personne`),
  KEY `aff_amortissement_duree_inscriptio` (`inscription`),
  KEY `aff_amortissement_duree` (`amortissement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_affectation_besoin_materiel_personne`
--

DROP TABLE IF EXISTS `visi_affectation_besoin_materiel_personne`;
CREATE TABLE IF NOT EXISTS `visi_affectation_besoin_materiel_personne` (
  `id_aff_commande_personne` int(11) NOT NULL AUTO_INCREMENT,
  `personne` int(11) DEFAULT NULL,
  `besoin` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `date_traite` date DEFAULT NULL,
  `date_reception` date DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_aff_commande_personne`),
  KEY `aff_besoin_etat_inscriptio` (`inscription`),
  KEY `affec_besoin_materiel_personne` (`personne`),
  KEY `affect_besoin_materiel_personne` (`besoin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour la table `visi_acquisition_materiel`
--
ALTER TABLE `visi_acquisition_materiel`
  ADD CONSTRAINT `acquis_materiel_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `materiel_livraison` FOREIGN KEY (`id_livraison`) REFERENCES `visi_livraison_materiel` (`id_livraison_commande`);

--
-- Contraintes pour la table `visi_affectation_amortissement_materiel_duree`
--
ALTER TABLE `visi_affectation_amortissement_materiel_duree`
  ADD CONSTRAINT `aff_amortissement_duree` FOREIGN KEY (`amortissement`) REFERENCES `visi_amortissement_materiel` (`id_postes`),
  ADD CONSTRAINT `aff_amortissement_duree_inscriptio` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ;

--
-- Contraintes pour la table `visi_affectation_besoin_materiel_personne`
--
ALTER TABLE `visi_affectation_besoin_materiel_personne`
  ADD CONSTRAINT `aff_besoin_etat_inscriptio` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `affec_besoin_materiel_personne` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`) ,
  ADD CONSTRAINT `affect_besoin_materiel_personne` FOREIGN KEY (`besoin`) REFERENCES `visi_besoin_materiel` (`id_postes`) ;

--
-- Structure de la table `visi_affectation_comande_materiel_fournisseur`
--

DROP TABLE IF EXISTS `visi_affectation_comande_materiel_fournisseur`;
CREATE TABLE IF NOT EXISTS `visi_affectation_comande_materiel_fournisseur` (
  `id_commande_fournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) DEFAULT NULL,
  `fournisseur` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_commande_fournisseur`),
  KEY `affe_materiel_commande` (`materiel`),
  KEY `commande_fournisseur_inscription` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_affectation_commande_materiel_personne`
--

DROP TABLE IF EXISTS `visi_affectation_commande_materiel_personne`;
CREATE TABLE IF NOT EXISTS `visi_affectation_commande_materiel_personne` (
  `id_aff_commande_personne` int(11) NOT NULL AUTO_INCREMENT,
  `personne` int(11) DEFAULT NULL,
  `commande` int(11) DEFAULT NULL,
  `fournisseur` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_aff_commande_personne`),
  KEY `aff_commande_personne_inscriptio` (`inscription`),
  KEY `affec_commande_materiel_personne` (`personne`),
  KEY `affect_c_m_p_ffournisseur` (`fournisseur`),
  KEY `affect_commande_materiel_personne` (`commande`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_affectation_defect_materiel_personne`
--

DROP TABLE IF EXISTS `visi_affectation_defect_materiel_personne`;
CREATE TABLE IF NOT EXISTS `visi_affectation_defect_materiel_personne` (
  `id_aff_commande_personne` int(11) NOT NULL AUTO_INCREMENT,
  `personne` int(11) DEFAULT NULL,
  `defect` int(11) DEFAULT NULL,
  `etat` int(11) DEFAULT NULL,
  `date_sortie` date DEFAULT NULL,
  `date_retour` date DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_aff_commande_personne`),
  KEY `aff_defect_etat_inscriptio` (`inscription`),
  KEY `affec_defect_materiel_personne` (`personne`),
  KEY `affect_defect_materiel_personne` (`defect`),
  KEY `affect_defect_materiel_personne_etat` (`etat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_affectation_panne_materiel_personne`
--

DROP TABLE IF EXISTS `visi_affectation_panne_materiel_personne`;
CREATE TABLE IF NOT EXISTS `visi_affectation_panne_materiel_personne` (
  `id_aff_commande_personne` int(11) NOT NULL AUTO_INCREMENT,
  `personne` int(11) DEFAULT NULL,
  `panne` int(11) DEFAULT NULL,
  `etat` int(11) DEFAULT NULL,
  `date_sortie` date DEFAULT NULL,
  `date_retour` date DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fournisseur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_aff_commande_personne`),
  KEY `aff_panne_etat_inscriptio` (`inscription`),
  KEY `affec_panne_materiel_personne` (`personne`),
  KEY `affect_panne_materiel_personne` (`panne`),
  KEY `affect_panne_materiel_personne_etat` (`etat`),
  KEY `affect_p_m_p_fournisseur` (`fournisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_amortissement_materiel`
--

DROP TABLE IF EXISTS `visi_amortissement_materiel`;
CREATE TABLE IF NOT EXISTS `visi_amortissement_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) DEFAULT NULL,
  `etat` int(11) DEFAULT NULL,
  `localisation` varchar(500) DEFAULT NULL,
  `personne` int(11) DEFAULT NULL,
  `acquisition` varchar(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `amortissement_inscription` (`inscription`),
  KEY `etat_amortissement` (`etat`),
  KEY `personne_amortissement` (`personne`),
  KEY `typ_amortissement` (`materiel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_besoin_materiel`
--

DROP TABLE IF EXISTS `visi_besoin_materiel`;
CREATE TABLE IF NOT EXISTS `visi_besoin_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) DEFAULT NULL,
  `niveau_urgence` int(11) DEFAULT NULL,
  `libelle_besoin` varchar(50) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `niveau_urgence` (`niveau_urgence`),
  KEY `besoin_materiel_inscription` (`inscription`),
  KEY `typ_besoin_materiel` (`materiel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_categorie_materiel`
--

DROP TABLE IF EXISTS `visi_categorie_materiel`;
CREATE TABLE IF NOT EXISTS `visi_categorie_materiel` (
  `id_categorie_materiel` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_materiel` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_categorie_materiel`),
  KEY `cat_mat_inscription` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_commande_materiel`
--

DROP TABLE IF EXISTS `visi_commande_materiel`;
CREATE TABLE IF NOT EXISTS `visi_commande_materiel` (
  `id_acquis_materiel` int(11) NOT NULL AUTO_INCREMENT,
  `id_materiel` int(11) DEFAULT NULL,
  `designation` text,
  `quantite_materiel` int(11) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `date_commande` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_acquis_materiel`),
  KEY `com_materiel_inscription` (`inscription`),
  KEY `materiel_commande` (`id_materiel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_defect_materiel`
--

DROP TABLE IF EXISTS `visi_defect_materiel`;
CREATE TABLE IF NOT EXISTS `visi_defect_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) DEFAULT NULL,
  `personne` int(11) DEFAULT NULL,
  `fournisseur` int(11) DEFAULT NULL,
  `date_reception` date DEFAULT NULL,
  `date_signalement` date DEFAULT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `defect_inscription` (`inscription`),
  KEY `typ_materiel_defect` (`materiel`),
  KEY `personne_defect` (`personne`),
  KEY `fournisseur` (`fournisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_etat_materiel`
--

DROP TABLE IF EXISTS `visi_etat_materiel`;
CREATE TABLE IF NOT EXISTS `visi_etat_materiel` (
  `id_etat` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_etat` varchar(250) DEFAULT NULL COMMENT 'passable, elevé, constituant, irrévocable',
  `couleur` varchar(20) DEFAULT NULL COMMENT 'bleu,orange,jaune,rouge',
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_etat`),
  KEY `etat_mat_inscrip` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour la table `visi_affectation_comande_materiel_fournisseur`
--
ALTER TABLE `visi_affectation_comande_materiel_fournisseur`
  ADD CONSTRAINT `affe_materiel_commande` FOREIGN KEY (`materiel`) REFERENCES `designation` (`id`),
  ADD CONSTRAINT `commande_fournisseur_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `visi_affectation_commande_materiel_personne`
--
ALTER TABLE `visi_affectation_commande_materiel_personne`
  ADD CONSTRAINT `aff_commande_personne_inscriptio` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `affec_commande_materiel_personne` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`) ,
  ADD CONSTRAINT `affect_c_m_p_ffournisseur` FOREIGN KEY (`fournisseur`) REFERENCES `visi_fournisseur_materiel` (`id_postes`),
  ADD CONSTRAINT `affect_commande_materiel_personne` FOREIGN KEY (`commande`) REFERENCES `visi_commande_materiel` (`id_acquis_materiel`) ;

--
-- Contraintes pour la table `visi_affectation_defect_materiel_personne`
--
ALTER TABLE `visi_affectation_defect_materiel_personne`
  ADD CONSTRAINT `aff_defect_etat_inscriptio` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `affec_defect_materiel_personne` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`) ,
  ADD CONSTRAINT `affect_defect_materiel_personne` FOREIGN KEY (`defect`) REFERENCES `visi_defect_materiel` (`id_postes`) ,
  ADD CONSTRAINT `affect_defect_materiel_personne_etat` FOREIGN KEY (`etat`) REFERENCES `visi_etat_materiel` (`id_etat`);

--
-- Contraintes pour la table `visi_affectation_panne_materiel_personne`
--
ALTER TABLE `visi_affectation_panne_materiel_personne`
  ADD CONSTRAINT `aff_panne_etat_inscriptio` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `affec_panne_materiel_personne` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`) ,
  ADD CONSTRAINT `affect_p_m_p_fournisseur` FOREIGN KEY (`fournisseur`) REFERENCES `visi_fournisseur_materiel` (`id_postes`),
  ADD CONSTRAINT `affect_panne_materiel_personne` FOREIGN KEY (`panne`) REFERENCES `visi_panne_materiel` (`id_postes`) ,
  ADD CONSTRAINT `affect_panne_materiel_personne_etat` FOREIGN KEY (`etat`) REFERENCES `visi_etat_materiel` (`id_etat`);

--
-- Contraintes pour la table `visi_amortissement_materiel`
--
ALTER TABLE `visi_amortissement_materiel`
  ADD CONSTRAINT `amortissement_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `etat_amortissement` FOREIGN KEY (`etat`) REFERENCES `visi_etat_materiel` (`id_etat`),
  ADD CONSTRAINT `personne_amortissement` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`),
  ADD CONSTRAINT `typ_amortissement` FOREIGN KEY (`materiel`) REFERENCES `designation` (`id`) ;

--
-- Contraintes pour la table `visi_besoin_materiel`
--
ALTER TABLE `visi_besoin_materiel`
  ADD CONSTRAINT `besoin_materiel_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `niveau_urgence` FOREIGN KEY (`niveau_urgence`) REFERENCES `visi_niveau_urgence_materiel` (`id_niveau`),
  ADD CONSTRAINT `typ_besoin_materiel` FOREIGN KEY (`materiel`) REFERENCES `designation` (`id`) ;

--
-- Contraintes pour la table `visi_categorie_materiel`
--
ALTER TABLE `visi_categorie_materiel`
  ADD CONSTRAINT `cat_mat_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `visi_commande_materiel`
--
ALTER TABLE `visi_commande_materiel`
  ADD CONSTRAINT `com_materiel_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `materiel_commande` FOREIGN KEY (`id_materiel`) REFERENCES `designation` (`id`);

--
-- Contraintes pour la table `visi_defect_materiel`
--
ALTER TABLE `visi_defect_materiel`
  ADD CONSTRAINT `defect_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `fournisseur` FOREIGN KEY (`fournisseur`) REFERENCES `visi_fournisseur_materiel` (`id_postes`),
  ADD CONSTRAINT `personne_defect` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`),
  ADD CONSTRAINT `typ_materiel_defect` FOREIGN KEY (`materiel`) REFERENCES `designation` (`id`) ;

--
-- Contraintes pour la table `visi_etat_materiel`
--
ALTER TABLE `visi_etat_materiel`
  ADD CONSTRAINT `etat_mat_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ;

--
-- Structure de la table `visi_fournisseur_materiel`
--

DROP TABLE IF EXISTS `visi_fournisseur_materiel`;
CREATE TABLE IF NOT EXISTS `visi_fournisseur_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `type_fournisseur` int(11) DEFAULT NULL,
  `personne` int(11) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `fournisseur_inscription` (`inscription`),
  KEY `typ_fournisseur` (`type_fournisseur`),
  KEY `fournisseur_personne` (`personne`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_inventaire_materiel`
--

DROP TABLE IF EXISTS `visi_inventaire_materiel`;
CREATE TABLE IF NOT EXISTS `visi_inventaire_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `quantite_stock` int(11) DEFAULT NULL,
  `stock_normal` int(11) DEFAULT NULL,
  `quantite_defectueux` int(11) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `inventaire_inscription` (`inscription`),
  KEY `typ_inventaire` (`materiel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_livraison_materiel`
--

DROP TABLE IF EXISTS `visi_livraison_materiel`;
CREATE TABLE IF NOT EXISTS `visi_livraison_materiel` (
  `id_livraison_commande` int(11) NOT NULL AUTO_INCREMENT,
  `commande_materiel` int(11) DEFAULT NULL,
  `quantite_materiel` int(11) DEFAULT NULL,
  `quantite_recu` int(11) DEFAULT NULL,
  `quantite_restante` int(11) DEFAULT NULL,
  `date_livraison` date DEFAULT NULL,
  `sanction_livraison` varchar(20) DEFAULT NULL COMMENT 'Ouverte, Fermée',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_livraison_commande`),
  KEY `commande_materiel` (`commande_materiel`),
  KEY `liv_materiel_inscription` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_niveau_panne_materiel`
--

DROP TABLE IF EXISTS `visi_niveau_panne_materiel`;
CREATE TABLE IF NOT EXISTS `visi_niveau_panne_materiel` (
  `id_niveau` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_niveau` varchar(250) DEFAULT NULL COMMENT 'passable, elev?, constituant, irr?vocable',
  `couleur` varchar(20) DEFAULT NULL COMMENT 'bleu,orange,jaune,rouge',
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_niveau`),
  KEY `niveau_panne_inscrip` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_niveau_urgence_materiel`
--

DROP TABLE IF EXISTS `visi_niveau_urgence_materiel`;
CREATE TABLE IF NOT EXISTS `visi_niveau_urgence_materiel` (
  `id_niveau` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_niveau` varchar(250) DEFAULT NULL COMMENT 'passable, elev?, constituant, irr?vocable',
  `couleur` varchar(20) DEFAULT NULL COMMENT 'bleu,orange,jaune,rouge',
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_niveau`),
  KEY `niveau_urgence_materiel_inscrip` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_panne_materiel`
--

DROP TABLE IF EXISTS `visi_panne_materiel`;
CREATE TABLE IF NOT EXISTS `visi_panne_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `niveau_panne` int(11) DEFAULT NULL,
  `libelle_panne` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `niveau_panne` (`niveau_panne`),
  KEY `panne_inscription` (`inscription`),
  KEY `typ_panne` (`materiel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `visi_type_fournisseur_materiel`
--

DROP TABLE IF EXISTS `visi_type_fournisseur_materiel`;
CREATE TABLE IF NOT EXISTS `visi_type_fournisseur_materiel` (
  `id_type_fornisseur` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_fornisseur`),
  KEY `type_fournisseur_inscript` (`inscription`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `visi_type_fournisseur_materiel`
--

INSERT INTO `visi_type_fournisseur_materiel` (`id_type_fornisseur`, `libelle`, `description`, `inscription`, `created_at`, `updated_at`) VALUES
(1, 'Interne', NULL, 1, NULL, NULL),
(2, 'Externe', NULL, 1, NULL, NULL);

DROP TABLE IF EXISTS `visi_type_panne_materiel`;
CREATE TABLE IF NOT EXISTS `visi_type_panne_materiel` (
  `id_type_panne` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_panne`),
  KEY `type_panne_inscript` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour la table `visi_fournisseur_materiel`
--
ALTER TABLE `visi_fournisseur_materiel`
  ADD CONSTRAINT `fournisseur_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `fournisseur_personne` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`),
  ADD CONSTRAINT `typ_fournisseur` FOREIGN KEY (`type_fournisseur`) REFERENCES `visi_type_fournisseur_materiel` (`id_type_fornisseur`) ;

--
-- Contraintes pour la table `visi_inventaire_materiel`
--
ALTER TABLE `visi_inventaire_materiel`
  ADD CONSTRAINT `inventaire_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `typ_inventaire` FOREIGN KEY (`materiel`) REFERENCES `designation` (`id`) ;

--
-- Contraintes pour la table `visi_livraison_materiel`
--
ALTER TABLE `visi_livraison_materiel`
  ADD CONSTRAINT `commande_materiel` FOREIGN KEY (`commande_materiel`) REFERENCES `visi_commande_materiel` (`id_acquis_materiel`),
  ADD CONSTRAINT `liv_materiel_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `visi_materiel`
--
ALTER TABLE `visi_materiel`
  ADD CONSTRAINT `materiel_categorie` FOREIGN KEY (`id_categorie_materiel`) REFERENCES `visi_categorie_materiel` (`id_categorie_materiel`),
  ADD CONSTRAINT `materiel_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `visi_niveau_panne_materiel`
--
ALTER TABLE `visi_niveau_panne_materiel`
  ADD CONSTRAINT `niveau_panne_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ;

--
-- Contraintes pour la table `visi_niveau_urgence_materiel`
--
ALTER TABLE `visi_niveau_urgence_materiel`
  ADD CONSTRAINT `niveau_urgence_materiel_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ;

--
-- Contraintes pour la table `visi_panne_materiel`
--
ALTER TABLE `visi_panne_materiel`
  ADD CONSTRAINT `niveau_panne` FOREIGN KEY (`niveau_panne`) REFERENCES `visi_niveau_panne_materiel` (`id_niveau`),
  ADD CONSTRAINT `panne_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ,
  ADD CONSTRAINT `typ_panne` FOREIGN KEY (`materiel`) REFERENCES `designation` (`id`) ;

--
-- Contraintes pour la table `visi_type_fournisseur_materiel`
--
ALTER TABLE `visi_type_fournisseur_materiel`
  ADD CONSTRAINT `type_fournisseur_inscript` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ;

--
-- Contraintes pour la table `visi_type_panne_materiel`
--
ALTER TABLE `visi_type_panne_materiel`
  ADD CONSTRAINT `type_panne_inscript` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ;

COMMIT;
