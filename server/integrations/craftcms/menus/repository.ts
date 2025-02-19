import { getTermNavigationMenu } from './api/get-term-navigation-menu'
import { getArchitecturalNavigationMenu } from './api/get-architectural-navigation-menu'
import { getBottomFooterMenu } from './api/get-bottom-footer-menu'
import { getTopMenu } from './api/get-top-menu'
import { getFooterMenu } from './api/get-footer-menu'
import { getHighwayNavigationMenu } from './api/get-highway-navigation-menu'
import { getMainNavigationMenu } from './api/get-main-navigation-menu'
import { getMechanicalNavigationMenu } from './api/get-mechanical-navigation-menu'
import { getNewMainNavigationMenu } from './api/get-new-main-navigation-menu'
import { getPipelineNavigationMenu } from './api/get-pipeline-navigation-menu'
import { getResidentialNavigationMenu } from './api/get-residential-navigation-menu'
import type { ApiContext } from '~~/shared/types'

export function createMenusRepository({ env }: ApiContext) {
  async function fetchArchitecturalNavigationMenu() {
    try {
      return await getArchitecturalNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchFooterMenu() {
    try {
      return await getFooterMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchMainNavigationMenu() {
    try {
      return await getMainNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchHighwayNavigationMenu() {
    try {
      return await getHighwayNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchMechanicalNavigationMenu() {
    try {
      return await getMechanicalNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchNewMainNavigationMenu() {
    try {
      return await getNewMainNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchPipelineNavigationMenu() {
    try {
      return await getPipelineNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchResidentialNavigationMenu() {
    try {
      return await getResidentialNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchTermNavigationMenu() {
    try {
      return await getTermNavigationMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchTopMenu() {
    try {
      return await getTopMenu({ env })
    } catch {
      return []
    }
  }

  async function fetchBottomFooterMenu() {
    try {
      return await getBottomFooterMenu({ env })
    } catch {
      return []
    }
  }

  return {
    fetchTopMenu,
    fetchArchitecturalNavigationMenu,
    fetchFooterMenu,
    fetchMainNavigationMenu,
    fetchHighwayNavigationMenu,
    fetchMechanicalNavigationMenu,
    fetchNewMainNavigationMenu,
    fetchPipelineNavigationMenu,
    fetchResidentialNavigationMenu,
    fetchTermNavigationMenu,
    fetchBottomFooterMenu,
  }
}
