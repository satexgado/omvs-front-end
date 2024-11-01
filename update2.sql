--
-- Structure de la table `trans_affectation_panne_automobile_personne`
--

DROP TABLE IF EXISTS `trans_affectation_panne_automobile_personne`;
CREATE TABLE IF NOT EXISTS `trans_affectation_panne_automobile_personne` (
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
  KEY `trans_autoaff_panne_etat_inscriptio` (`inscription`),
  KEY `trans_autoaffec_panne_automobile_personne` (`personne`),
  KEY `trans_autoaffect_panne_automobile_personne` (`panne`),
  KEY `trans_autoaffect_panne_automobile_personne_etat` (`etat`),
  KEY `trans_autoaffect_p_m_p_fournisseur` (`fournisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `trans_panne_automobile`
--

DROP TABLE IF EXISTS `trans_panne_automobile`;
CREATE TABLE IF NOT EXISTS `trans_panne_automobile` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `automobile` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `niveau_panne` int(11) DEFAULT NULL,
  `libelle_panne` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_postes`),
  KEY `trans_auto_niveau_panne` (`niveau_panne`),
  KEY `trans_auto_panne_inscription` (`inscription`),
  KEY `trans_auto_typ_panne` (`automobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `trans_type_panne_automobile`;
CREATE TABLE IF NOT EXISTS `trans_type_panne_automobile` (
  `id_type_panne` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_panne`),
  KEY `trans_auto_type_panne_inscript` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `trans_etat_automobile`;
CREATE TABLE IF NOT EXISTS `trans_etat_automobile` (
  `id_etat` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_etat` varchar(250) DEFAULT NULL COMMENT 'passable, elev?, constituant, irr?vocable',
  `couleur` varchar(20) DEFAULT NULL COMMENT 'bleu,orange,jaune,rouge',
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_etat`),
  KEY `trans_etat_auto_inscrip` (`inscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour la table `trans_panne_automobile`
--
ALTER TABLE `trans_panne_automobile`
  ADD CONSTRAINT `trans_auto_niveau_panne` FOREIGN KEY (`niveau_panne`) REFERENCES `visi_niveau_panne_materiel` (`id_niveau`),
  ADD CONSTRAINT `trans_auto_panne_inscription` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trans_auto_typ_panne` FOREIGN KEY (`automobile`) REFERENCES `trans_auto` (`id_bus`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Contraintes pour la table `trans_affectation_panne_automobile_personne`
--
ALTER TABLE `trans_affectation_panne_automobile_personne`
  ADD CONSTRAINT `trans_autoaff_panne_etat_inscriptio` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trans_autoaffec_panne_automobile_personne` FOREIGN KEY (`personne`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trans_autoaffect_p_m_p_fournisseur` FOREIGN KEY (`fournisseur`) REFERENCES `visi_fournisseur_materiel` (`id_postes`),
  ADD CONSTRAINT `trans_autoaffect_panne_automobile_personne` FOREIGN KEY (`panne`) REFERENCES `trans_panne_automobile` (`id_postes`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trans_autoaffect_panne_automobile_personne_etat` FOREIGN KEY (`etat`) REFERENCES `trans_etat_automobile` (`id_etat`);

ALTER TABLE `trans_etat_automobile`
  ADD CONSTRAINT `trans_etat_auto_inscrip` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `trans_type_panne_automobile`
  ADD CONSTRAINT `trans_auto_type_panne_inscript` FOREIGN KEY (`inscription`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


DROP TABLE IF EXISTS `visi_fournisseur_materiel`;
CREATE TABLE IF NOT EXISTS `visi_fournisseur_materiel` (
  `id_postes` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `telephone` varchar(191) NOT NULL,
  `adresse` varchar(191) NOT NULL,
  `condition_suivi` text DEFAULT NULL,
  `commentaire` text DEFAULT NULL,
  `tag` text DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_postes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `visi_type_fournisseur_materiel`;
CREATE TABLE IF NOT EXISTS `visi_type_fournisseur_materiel` (
  `id_type_fornisseur` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_fornisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `cr_coordonnee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `telephone` varchar(191) NOT NULL,
  `adresse` varchar(191) NOT NULL,
  `condition_suivi` text DEFAULT NULL,
  `commentaire` text DEFAULT NULL,
  `inscription_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tag` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `cr_coordonnee_groupe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `inscription_id` int(11) UNSIGNED NOT NULL,
  `groupe_id` int(11) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

DROP TABLE IF EXISTS `cr_coordonnee_type`;
CREATE TABLE IF NOT EXISTS `cr_coordonnee_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `cr_affectation_coordonnee_groupe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coordonnee_id` int(11) NOT NULL,
  `groupe_id` int(11) NOT NULL,
  `inscription_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- Listage des données de la table vision.bloquer_journal : ~0 rows (environ)
/*!40000 ALTER TABLE `bloquer_journal` DISABLE KEYS */;
/*!40000 ALTER TABLE `bloquer_journal` ENABLE KEYS */;

-- Listage de la structure de la table vision. cal_calendrier
CREATE TABLE IF NOT EXISTS `cal_calendrier` (
  `id_calendrier` int(11) NOT NULL AUTO_INCREMENT,
  `groupe` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `duration` varchar(20) DEFAULT NULL,
  `rrule` varchar(2000) DEFAULT NULL,
  `libelle` varchar(100) DEFAULT NULL COMMENT 'calendrier des cours, calendriers des devoirs, des examens, de rattrapage,...',
  `lieu` varchar(300) DEFAULT NULL,
  `date_debut` timestamp NULL DEFAULT NULL,
  `date_fin` timestamp NULL DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `all_day` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `affectable_type` varchar(2000) DEFAULT NULL,
  `affectable_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_calendrier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de la table vision. cal_groupe_calendrier
CREATE TABLE IF NOT EXISTS `cal_groupe_calendrier` (
  `id_type_calendrier` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(300) CHARACTER SET utf8 DEFAULT NULL COMMENT 'calendrier des inscriptions 2020, calendrier des examens, calendriers des fètes, .............',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_type_calendrier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage de la structure de la table vision. cal_type_calendrier
CREATE TABLE IF NOT EXISTS `cal_type_calendrier` (
  `id_type_calendrier` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_type` varchar(100) DEFAULT NULL COMMENT 'calendrier des cours, calendriers des devoirs, des examens, de rattrapage,...',
  `couleur` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_type_calendrier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table vision.cal_type_calendrier : ~3 rows (environ)
/*!40000 ALTER TABLE `cal_type_calendrier` DISABLE KEYS */;
INSERT INTO `cal_type_calendrier` (`id_type_calendrier`, `libelle_type`, `couleur`, `created_at`, `updated_at`, `inscription`) VALUES
	(1, 'Affectation', '#5d78ff', NULL, NULL, NULL),
	(2, 'Reunion', '#9e5fff', NULL, NULL, NULL),
	(3, 'Cours', '#03bd9e', NULL, NULL, NULL),
	(4, 'Evaluation', '#eac459', NULL, NULL, NULL),
	(5, 'Inscription', '#75785f', NULL, NULL, NULL);
/*!40000 ALTER TABLE `cal_type_calendrier` ENABLE KEYS */;