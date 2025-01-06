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

CREATE TABLE `cr_coordonnee_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `statut` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `telephone` varchar(191) NOT NULL,
  `inscription_id` int(11) NOT NULL,
  `coordonnee_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `trans_auto_mission` (
  `id` int(11) NOT NULL,
  `auto_id` int(11) NOT NULL,
  `mission_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `trans_auto_mission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_trans_auto__mission_idx` (`mission_id`),
  ADD KEY `fk_trans_mission__auto_idx` (`auto_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `trans_auto_mission`
--
ALTER TABLE `trans_auto_mission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `trans_auto_mission`
--
ALTER TABLE `trans_auto_mission`
  ADD CONSTRAINT `fk_trans_mission__auto_idx` FOREIGN KEY (`auto_id`) REFERENCES `trans_auto` (`id_bus`),
  ADD CONSTRAINT `fk_trans_auto__mission_idx` FOREIGN KEY (`mission_id`) REFERENCES `cr_coordonnee` (`id`);
COMMIT;


CREATE TABLE `ass_masque_assurance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `prime` int(11) NOT NULL,
  `periodicite` varchar(191) NOT NULL COMMENT 'mensuel, annuel',
  `duree_periodicite` int(11) NOT NULL,
  `description` text NOT NULL,
  `inscription_id` int(11) NOT NULL,
  `coordonnee_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `ass_masque_assurance`
  ADD KEY `fk_ass_massurance_inscription_idx` (`inscription_id`),
  ADD KEY `fk_ass_massurance_coordonnee_idx` (`coordonnee_id`);

--
-- Contraintes pour la table `ass_masque_assurance`
--
ALTER TABLE `ass_masque_assurance`
  ADD CONSTRAINT `fk_ass_massurance_inscription_idx` FOREIGN KEY (`inscription_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_ass_massurance_coordonnee_idx` FOREIGN KEY (`coordonnee_id`) REFERENCES `cr_coordonnee` (`id`);

CREATE TABLE `ass_assurance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `prime` int(11) NOT NULL,
  `periodicite` varchar(191) NOT NULL COMMENT 'mensuel, annuel',
  `duree_periodicite` int(11) NOT NULL,
  `description` text NOT NULL,
  `numero_contrat` varchar(191) NOT NULL,
  `etat_contrat` varchar(191) NOT NULL COMMENT 'actif, expiré, suspendu',
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `inscription_id` int(11) NOT NULL,
  `coordonnee_id` int(11) NOT NULL,
  `auto_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `ass_assurance`
  ADD KEY `fk_ass_assurance_inscription_idx` (`inscription_id`),
  ADD KEY `fk_ass_assurance_auto_idx` (`auto_id`),
  ADD KEY `fk_ass_assurance_coordonnee_idx` (`coordonnee_id`);

--
-- Contraintes pour la table `ass_masque_assurance`
--
ALTER TABLE `ass_assurance`
  ADD CONSTRAINT `fk_ass_assurance_inscription_idx` FOREIGN KEY (`inscription_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_ass_assurance_auto_idx` FOREIGN KEY (`auto_id`) REFERENCES `trans_auto` (`id_bus`),
  ADD CONSTRAINT `fk_ass_assurance_coordonnee_idx` FOREIGN KEY (`coordonnee_id`) REFERENCES `cr_coordonnee` (`id`);

CREATE TABLE `ass_paiement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` int(11) NULL DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `type_paiement` varchar(191) NOT NULL COMMENT 'chèque, virement, carte, espece, mobile money etc.',
  `inscription_id` int(11) NOT NULL,
  `assurance_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `ass_paiement`
  ADD KEY `fk_ass_paiement_inscription_idx` (`inscription_id`),
  ADD KEY `fk_ass_paiement_assurance_idx` (`assurance_id`);

--
-- Contraintes pour la table `ass_masque_assurance`
--
ALTER TABLE `ass_paiement`
  ADD CONSTRAINT `fk_ass_paiement_inscription_idx` FOREIGN KEY (`inscription_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_ass_paiement_assurance_idx` FOREIGN KEY (`assurance_id`) REFERENCES `ass_assurance` (`id`);


CREATE TABLE `ass_sinistre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(191) NOT NULL,
  `montant_remboursement` int(11) NULL DEFAULT NULL,
  `description` text NOT NULL,
  `date_sinistre` date DEFAULT NULL,
  `statut` varchar(191) NOT NULL COMMENT 'en attente, traité, refusé',
  `inscription_id` int(11) NOT NULL,
  `assurance_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `ass_sinistre`
  ADD KEY `fk_ass_sinistre_inscription_idx` (`inscription_id`),
  ADD KEY `fk_ass_sinistre_assurance_idx` (`assurance_id`);

--
-- Contraintes pour la table `ass_masque_assurance`
--
ALTER TABLE `ass_sinistre`
  ADD CONSTRAINT `fk_ass_sinistre_inscription_idx` FOREIGN KEY (`inscription_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_ass_sinistre_assurance_idx` FOREIGN KEY (`assurance_id`) REFERENCES `ass_assurance` (`id`);


CREATE TABLE `trans_visite_technique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_visite` date DEFAULT NULL,
  `observations` text NOT NULL,
  `inscription_id` int(11) NOT NULL,
  `coordonnee_id` int(11) NOT NULL,
  `auto_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `trans_visite_technique`
  ADD KEY `fk_tr_vtechnique_inscription_idx` (`inscription_id`),
  ADD KEY `fk_tr_vtechnique_auto_idx` (`auto_id`),
  ADD KEY `fk_tr_vtechnique_coordonnee_idx` (`coordonnee_id`);

--
-- Contraintes pour la table `ass_masque_assurance`
--
ALTER TABLE `trans_visite_technique`
  ADD CONSTRAINT `fk_tr_vtechnique_inscription_idx` FOREIGN KEY (`inscription_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_tr_vtechnique_auto_idx` FOREIGN KEY (`auto_id`) REFERENCES `trans_auto` (`id_bus`),
  ADD CONSTRAINT `fk_tr_vtechnique_coordonnee_idx` FOREIGN KEY (`coordonnee_id`) REFERENCES `cr_coordonnee` (`id`);

CREATE TABLE IF NOT EXISTS `trans_bon_Approvisionnement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(300) DEFAULT NULL COMMENT 'réservoir véhicule, réservoirs pleins,
    bidons, fûts, citernes',
  `quantite_specifique` TINYINT(1) DEFAULT NULL, 
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `trans_bon_Approvisionnement` (`id`, `libelle`, `quantite_specifique`,`created_at`, `updated_at`, `inscription`) VALUES
	(1, 'réservoir véhicule',1, NULL, NULL, NULL),
	(2, 'Réservoir(s) plein(s)',0, NULL, NULL, NULL),
	(3, 'Bidon(s)',1, NULL, NULL, NULL),
	(4, 'Fût(s)',1, NULL, NULL, NULL),
	(5, 'Citerne(s)',1, NULL, NULL, NULL);

CREATE TABLE IF NOT EXISTS `trans_bon_type_coupure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `trans_bon_type_coupure` (`id`, `libelle`,`created_at`, `updated_at`, `inscription`) VALUES
	(1, '30 Litres', NULL, NULL, NULL),
  (2, '50 Litres', NULL, NULL, NULL);

CREATE TABLE IF NOT EXISTS `trans_bon_type_engagement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `trans_bon_type_engagement` (`id`, `libelle`,`created_at`, `updated_at`, `inscription`) VALUES
	(1, 'Mensualité', NULL, NULL, NULL),
  (2, 'Mission', NULL, NULL, NULL);
	

DROP TABLE IF EXISTS `trans_bon_carburant_entree`;
CREATE TABLE IF NOT EXISTS `trans_bon_carburant_entree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coordonnee_id` int(11) NOT NULL,
  `libelle` varchar(3000) DEFAULT NULL,
  `type_carburant` int(11) DEFAULT NULL,
  `type_coupure` int(11) DEFAULT NULL,
  `nombre_coupure` int(11) DEFAULT NULL,
  `date_emission` date DEFAULT NULL,
  `date_expiration` date DEFAULT NULL,
  `approvisionnement` int(11) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `trans_bon_carburant_sortie`;
CREATE TABLE IF NOT EXISTS `trans_bon_carburant_sortie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(3000) DEFAULT NULL,
  `type_carburant` int(11) DEFAULT NULL,
  `type_coupure` int(11) DEFAULT NULL,
  `nombre_coupure` int(11) DEFAULT NULL,
  `date_reception` date DEFAULT NULL,
  `auto_id` int(11) NOT NULL,
  `type_engagement` int(11) DEFAULT NULL,
  `quantite_litre` int(11) DEFAULT NULL,
  `autorise_par` varchar(3000) DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `trans_bon_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_carburant` int(11) DEFAULT NULL,
  `type_coupure` int(11) DEFAULT NULL,
  `quantiteEnStock ` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `visite_medicale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(250) DEFAULT NULL COMMENT 'motif',
  `date_visite` date DEFAULT NULL,
  `diagnostic` text DEFAULT NULL,
  `traitements_prescrits` text DEFAULT NULL,
  `commentaires` text DEFAULT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `fichier_conducteur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(250) DEFAULT NULL COMMENT 'titre_document',
  `document_scanne` text DEFAULT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `carte_rapido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(250) DEFAULT NULL COMMENT 'numero de carte',
  `solde` int(11) NULL DEFAULT NULL,
  `personnel_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- carte_abonnement_carburant must update 
CREATE TABLE IF NOT EXISTS `carte_abonnement_carburant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(250) DEFAULT NULL COMMENT 'numero de carte',
  `solde` int(11) NULL DEFAULT NULL,
  `personnel_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inscription` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;