import {
  useEffect as useEffectBase,
  useRef as useRefBase,
  useState as useStateBase
} from 'react'

import {
  useHistory as useHistoryBase,
  useLocation as useLocationBase,
  useParams as useParamsBase,
  useRouteMatch as useRouteMatchBase
} from 'react-router-dom'

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase
} from 'react-redux'

import {
  useMutation as useMutationBase,
  useQuery as useQueryBase
} from '@apollo/client'

import {
  useTranslation as useTranslationBase
} from 'react-i18next'

export const useEffect = useEffectBase
export const useRef = useRefBase
export const useState = useStateBase

export const useHistory = useHistoryBase
export const useLocation = useLocationBase
export const useParams = useParamsBase
export const useRouteMatch = useRouteMatchBase

export const useDispatch = useDispatchBase
export const useSelector = useSelectorBase

export const useMutation = useMutationBase
export const useQuery = useQueryBase

export const useTranslation = useTranslationBase
