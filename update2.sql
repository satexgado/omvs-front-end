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
